// declare module 'express-serve-static-core' {
//    interface Request {
//       user: any
//    }
//    interface Response {
//       user: any
//    }
// }

// declare module 'express' {
//    interface Request {
//       user: any
//    }
//    interface Response {
//       user: any
//    }
// }

declare namespace Express {
   interface Request {
      user: any,
      logger: any
   }
}

// declare namespace Express {
//     export interface Request {
//        user: any
//     }
//  }

//  declare global {
//    namespace Express {
//      interface Request {
//        user: any
//      }
//    }
//  }