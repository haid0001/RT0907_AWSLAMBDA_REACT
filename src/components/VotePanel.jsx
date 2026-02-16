import { useEffect, useState } from "react";
import { getCandidats, vote } from "../services/api";

export default function VotePanel({ user, onVoteDone }) {
  const [candidats, setCandidats] = useState([]);
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const idUtilisateur = user.username;
  const storageKey = `hasVoted_${idUtilisateur}`;

  useEffect(() => {
    getCandidats().then(setCandidats);
    if (localStorage.getItem(storageKey) === "true") {
      setHasVoted(true);
    }
  }, [storageKey]);

  const handleVote = async () => {
    if (!selected) {
      setMessage("Veuillez sélectionner un candidat.");
      return;
    }
    const response = await vote(idUtilisateur, selected);
    if (response.message?.includes("déjà voté")) {
      setMessage("⚠️ Vous avez déjà voté.");
      setHasVoted(true);
      localStorage.setItem(storageKey, "true");
    } else {
      setMessage("✅ Vote enregistré avec succès !");
      setHasVoted(true);
      localStorage.setItem(storageKey, "true");
      
      // 🔄 MAJ diagramme
      if (onVoteDone) {
        await onVoteDone();
      }
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🗳️ Voter</h2>
      <p>Utilisateur connecté : <strong>{idUtilisateur}</strong></p>
      {hasVoted ? (
        <p style={{ color: "#4CAF50" }}>
          Vous avez déjà voté. Merci pour votre participation !
        </p>
      ) : (
        <>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
            <option value="">-- Choisir un candidat --</option>
            {candidats.map(c => (
              <option key={c.id_candidat} value={c.id_candidat}>
                {c.id_candidat}
              </option>
            ))}
          </select>
          <button onClick={handleVote}>
            Voter
          </button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}