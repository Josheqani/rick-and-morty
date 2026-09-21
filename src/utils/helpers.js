export const getStatusClass = (status) => {
  if (status === "Alive") return "status--alive";
  if (status === "Dead") return "status--dead red";
  return "status--unknown";
};

export const getGenderIcon = (gender) => {
  if (gender === "Male") return "👨";
  if (gender === "Female") return "👩‍🦰";
  if (gender === "Genderless") return "🧑";
  return "❓";
};
