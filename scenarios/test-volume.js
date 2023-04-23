import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '2m',
};

export default function () {
  const authHeaders = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNTg5NzU4NzQ2LCJleHAiOjE1ODk3Njg3NDZ9.B6TASHV8k9xBerz4NSeFBlAZGSDhZlqESt767M0567I',
      monitor: false,
    },
  };

  const res = http.get(
    'http://localhost:3000/usuarios/0uxuPY0cbmQhpEz1',
    authHeaders,
  );

  const checkRes = check(res, {
    'status is 200': (resp) => resp.status === 200,
    'response time is less than 5s': (resp) => resp.timings.duration < 5000,
  });

  sleep(Math.random() * 3 + 2);

  if (!checkRes) {
    console.error(`Error for user ${authHeaders.headers.Authorization}`);
  }
}