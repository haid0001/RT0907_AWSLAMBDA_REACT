import { fetchAuthSession } from "aws-amplify/auth";

const API_URL = "https://a3n8zcc4n2.execute-api.eu-west-3.amazonaws.com";

export async function getCandidats() {
  const res = await fetch(`${API_URL}/candidats`);
  return res.json();
}

export async function getResults() {
  const res = await fetch(`${API_URL}/results`);
  return res.json();
}

export async function getDocuments() {
  const res = await fetch(`${API_URL}/documents`);
  return res.json();
}

export async function vote(id_utilisateur, id_candidat) {
  // 🔐 Récupération du token Cognito
  const session = await fetchAuthSession();
  const token = session.tokens.idToken.toString();

  const res = await fetch(`${API_URL}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 LIGNE CLÉ
    },
    body: JSON.stringify({
      id_utilisateur,
      id_candidat,
    }),
  });

  return res.json();
}
