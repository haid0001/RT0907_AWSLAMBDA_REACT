import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

import CandidatsList from "./components/CandidatsList";
import VotePanel from "./components/VotePanel";
import ResultsChart from "./components/ResultsChart";
import DocumentsList from "./components/DocumentsList";
import AdminCandidats from "./components/AdminCandidats";
import AdminDocuments from "./components/AdminDocuments";

const API_URL = "https://a3n8zcc4n2.execute-api.eu-west-3.amazonaws.com";

export default function AuthenticatedApp({ user, signOut }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidats, setCandidats] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [results, setResults] = useState([]);


  // 🔄 Chargement des candidats
  const loadCandidats = async () => {
    const res = await fetch(`${API_URL}/candidats`);
    const data = await res.json();
    setCandidats(data);
  };

  // 🔄 Chargement des documents
  const loadDocuments = async () => {
    const res = await fetch(`${API_URL}/documents`);
    const data = await res.json();
    setDocuments(data);
  };

  const loadResults = async () => {
    const res = await fetch(`${API_URL}/results`);
    const data = await res.json();
    setResults(data.results);
  };


  // 🔐 Vérification admin + chargement initial
  useEffect(() => {
    const init = async () => {
      try {
        const session = await fetchAuthSession();
        const payload = session.tokens.idToken.payload;

        console.log("JWT payload:", payload);

        const groups = payload["cognito:groups"] || [];
        console.log("GROUPS:", groups);

        setIsAdmin(groups.includes("admin"));
      } catch (err) {
        console.error("Erreur récupération session:", err);
        setIsAdmin(false);
      }

      loadCandidats();
      loadDocuments();
      loadResults();
    };

    init();
  }, []);

  return (
    <div className="container">
      <div style={{ padding: "20px" }}>
        {/* TOP BAR */}
        <div className="top-bar">
          <h1> Application de vote</h1>
          <button className="logout-btn" onClick={signOut}>
            Déconnexion
          </button>
        </div>

        <p>
          Connecté en tant que : <strong>{user?.username}</strong>
        </p>

        <hr />

        {/* MAIN GRID - USER */}
        <div className="main-grid">
          <div className="left-column">
            <CandidatsList candidats={candidats} />
            <VotePanel user={user} onVoteDone={loadResults} />
          </div>

          <div className="right-column">
            <ResultsChart results={results} />
          </div>
        </div>

        <DocumentsList documents={documents} />

        {/* ADMIN */}
        {isAdmin && (
          <>
            <hr />
            <AdminCandidats onCandidatAdded={loadCandidats} />
            <AdminDocuments
              candidats={candidats}
              onDocumentAdded={loadDocuments}
            />
          </>
        )}
      </div>
    </div>
  );
}