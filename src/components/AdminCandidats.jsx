import { useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

export default function AdminCandidats( { onCandidatAdded } ) {
  const [idCandidat, setIdCandidat] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔐 Récupération automatique du token (Amplify v6)
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();

      const res = await fetch(
        "https://a3n8zcc4n2.execute-api.eu-west-3.amazonaws.com/admin/candidats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            id_candidat: idCandidat
          })
        }
      );

      const data = await res.json();
      
      if (res.ok) {
        setMessage(" Candidat ajouté avec succès");
        setIdCandidat("");
        if (onCandidatAdded){
          await onCandidatAdded();
        }
      }else {
        setMessage(` ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur d’authentification");
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🔐 Administration — Ajouter un candidat</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID du candidat"
          value={idCandidat}
          onChange={(e) => setIdCandidat(e.target.value)}
          required
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          Ajouter
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
