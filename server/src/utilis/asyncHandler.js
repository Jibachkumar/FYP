// high order function: fn() return fn()

// const asyncHandler1 = (fn) => {
//   async(req, res, next) => {
//     try{
//         await fn(req, res, next)
//     }catch(err){
//         res.status(err.code || 500).json({
//             sucess: false,
//             message: err.message
//         })
//     }
//   };
// };

const asyncHandler = (requestHandler) => {
  async (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
