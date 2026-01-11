exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Function is working!",
      path: event.path,
      method: event.httpMethod,
    }),
  };
};
