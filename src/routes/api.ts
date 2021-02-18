import express from 'express';
const router = express.Router();

router.get('/test', (req, res) => {
  res.send({
    status: 1,
    message: 'ok!',
  });
});

export default router;
