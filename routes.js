import { Router } from "@edgio/core/router";

export default new Router()
  .prerender(new Array(100).fill(0).map((i, _) => ({ path: `/${_}` })))
  .fallback(({ compute, cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    });
    compute((req, res) => {
      res.body = req.url;
      res.statusCode = 200;
      res.statusMessage = "OK";
    });
  });
