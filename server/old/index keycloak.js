const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const querystring = require("querystring");

const PORT = process.env["PORT"];
const CLIENT_ID = process.env["CLIENT_ID"];
const CLIENT_SECRET = process.env["CLIENT_SECRET"];
const SCOPE = process.env["SCOPE"];
const JWT_REFRESH_SECRET = process.env["JWT_REFRESH_SECRET"];
const FQDN = process.env["FQDN"]; // this is MY url, zonder slash!!!
const COOKIE_DOMAIN = process.env["COOKIE_DOMAIN"];
const OIDC_ISSUER = process.env["OIDC_ISSUER"];

// TODO: make this a bit more configurable
const DEBUG = true;
function log(...args) {
  if (DEBUG) {
    console.log(chalk.cyanBright(`[${new Date().toLocaleString('en-US')}]`), ...args);
  }
}

async function main() {
  // ---------------------------------------------------------------------------------------
  // get keycloak realm config
  // ---------------------------------------------------------------------------------------
  const keycloak = await fetch(`${OIDC_ISSUER}/.well-known/openid-configuration`, {
    method: "GET",
    headers: { Accept: "application/json" }
  }).then(_res => _res.json())
    .catch((reason) => {
      log("❌ keycloak error", reason);
      process.exit(1);
    });
  if (!keycloak.authorization_endpoint) {
    log("❌ keycloak authorization_endpoint missing, response:", keycloak);
    process.exit(1);
  } else {
    console.log(`✅ OpenID config acquired successfully from ${OIDC_ISSUER}`);
  }
  // ---------------------------------------------------------------------------------------
  // start express
  // ---------------------------------------------------------------------------------------
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());
  // ---------------------------------------------------------------------------------------
  // Allow calls from web components with cookies
  // ---------------------------------------------------------------------------------------
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (!origin) {
      // log("/pre", "headers", req.headers);
      res.header("Access-Control-Allow-Origin", '*');
      return next();
    }
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    return next();
  });
  // ---------------------------------------------------------------------------------------
  // PRE CHECK
  // ---------------------------------------------------------------------------------------
  // app.use(async (req, res, next) => {
  //   log("/pre", "cookies", req.cookies);
  //   log("/pre", "headers", req.headers);
  //   return next();
  // });
  // ---------------------------------------------------------------------------------------
  // AUTH
  // ---------------------------------------------------------------------------------------
  app.get("/auth", async (req, res) => {
    if (!req.headers["referer"]) {
      log("❌ /auth", `headers["referer"] is missing, using x-application-url: ${req.headers["x-application-url"]}`);
    }
    const redirect = (req.headers["referer"])
      ? `redirect=${req.headers["referer"]}`
      : `redirect=${req.headers["x-application-url"]}`;
    try {
      const { refresh_token } = req.cookies;
      const user = jwt.verify(
        refresh_token,
        JWT_REFRESH_SECRET
      );
      log("✅ /auth", "ok", redirect.replace("redirect=", "for "), user.email);
      return res.status(200).send("OK");
    } catch (error) {
      log("❌ /auth", "error", error.message);
      log("✅ /auth", "redirect", `/login/?${redirect}`);
      return res.redirect(`/login/?${redirect}`);
    }
  });
  // ---------------------------------------------------------------------------------------
  // LOGIN (into keycloak)
  // ---------------------------------------------------------------------------------------
  app.get("/login", (req, res) => {
    const redirect = `redirect=${req.query.redirect}`;
    const RESPONSE_TYPE = "code";
    const url = `${keycloak.authorization_endpoint}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&redirect_uri=${FQDN}/login/callback?${redirect}`;
    log("✅ /login", "redirect to", url);
    return res.redirect(url);
  });
  // ---------------------------------------------------------------------------------------
  // LOGIN CALLBACK (by keycloak)
  // ---------------------------------------------------------------------------------------
  app.get("/login/callback", async (req, res, next) => {
    const { code, redirect } = req.query;
    try {
      const params = {
        client_secret: CLIENT_SECRET,
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        redirect_uri: `${FQDN}/login/callback?redirect=${redirect}`,
        code: code,
      };
      const tokenResponse = await fetch(
        keycloak.token_endpoint,
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: querystring.stringify(params)
        }
      ).then(_res => _res.json());
      const user = await fetch(keycloak.userinfo_endpoint, {
        method: "GET",
        headers: {
          "Authorization": `bearer ${tokenResponse.access_token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(_res => _res.json());
      log("✅ keycloak user received:", user);
      // TODO:
      // DO STUFF WITH ALLOWED USERS (supplied via HEADER per container)
      // DO STUFF WITH GROUPS (keycloak groups, list supplied via HEADER per container)
      // DO STUFF WITH LIST OF AUTHORIZED APPLICATIONS (Where can I put this list in keycloak?)
      // INVESTIGATE: how to fetch groups from keycloak
      // INVESTIGATE: how to configure and fetch list of apps from keycloak
      const refreshJwtToken = jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: "1d" });
      res.cookie("refresh_token", refreshJwtToken, {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        domain: COOKIE_DOMAIN,
        secure: true
      });
      log("✅ /login/callback", "redirect to", req.query.redirect);
      return res.redirect(req.query.redirect);
    } catch (error) {
      log("❌ /login/callback", "error", error);
      return next(error);
    }
  });
  // ---------------------------------------------------------------------------------------
  // HEALTHCHECK
  // ---------------------------------------------------------------------------------------
  app.get("/health", async (req, res, next) => {
    res.status(200).send("ok");
  });
  // ---------------------------------------------------------------------------------------
  // START LISTENING
  // ---------------------------------------------------------------------------------------
  app.listen(PORT, () => { console.log(`🚀 Server listening on port ${PORT}\n`); });
}

main()
  .catch(e => { console.error("error in main", e); })
  .finally(async () => { });
