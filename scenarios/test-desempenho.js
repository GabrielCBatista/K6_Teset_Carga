import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 5 },
    { duration: '3m', target: 10 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'], // 95% das requisições devem ser menores que 5 segundos
    'http_reqs{status:200}': ['rate>=0.8'], // 80% das requisições com status 200 devem obter sucesso
  },
};

export default function () {
  const loginPayload = JSON.stringify({
    email: 'fulano@qa.com',
    password: 'teste',
  });

  const loginHeaders = {
    headers: {
      'Content-Type': 'application/json',
      monitor: false,
    },
  };

  const loginRes = http.post(
    'http://localhost:3000/login',
    loginPayload,
    loginHeaders,
  );

  check(loginRes, { 'login successful': (resp) => resp.status === 200 });

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
      monitor: false,
    },
  };

  const getUserRes = http.get(
    'http://localhost:3000/usuarios/0uxuPY0cbmQhpEz1',
    authHeaders,
  );

  check(getUserRes, { 'status is 200': (resp) => resp.status === 200 });

  sleep(1);
}