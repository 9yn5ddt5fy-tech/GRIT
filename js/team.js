// Team members shown on member.html?m=<id>.
// To add a biography, write it in `bio` (one string per paragraph).
const TEAM = {
  namuunbayar: {
    name: "M. Namuunbayar",
    role: "Graphic Designer",
    photo: "assets/img/team-1.jpg",
    responsibilities: "Design and content",
    bio: [],
  },
  anar: {
    name: "B. Anar",
    role: "Teacher",
    photo: "assets/img/team-2.jpg",
    responsibilities: "Teaching",
    bio: [],
  },
  munkhdalai: {
    name: "B. Munkhdalai",
    role: "English Teacher",
    photo: "assets/img/team-3.jpg",
    responsibilities: "English, country information",
    bio: [],
  },
  enkhgerel: {
    name: "O. Enkhgerel",
    role: "Program Manager",
    photo: "assets/img/team-4.jpg",
    responsibilities: "Organization, country information",
    bio: [],
  },
  tulga: {
    name: "B. Tulga",
    role: "English Teacher",
    photo: "assets/img/team-5.jpg",
    responsibilities: "English, cooking",
    bio: [],
  },
};

(function renderMember() {
  const id = new URLSearchParams(location.search).get("m");
  const member = TEAM[id] || TEAM.namuunbayar;
  const set = (elId, fn) => {
    const el = document.getElementById(elId);
    if (el) fn(el);
  };

  document.title = `${member.name} — GRIT`;
  set("member-name", (el) => (el.textContent = member.name));
  set("member-role", (el) => (el.textContent = member.role));
  set("member-photo", (el) => {
    el.src = member.photo;
    el.alt = `${member.name}, ${member.role}`;
  });
  set("member-bio", (el) => {
    const paragraphs = member.bio.length ? member.bio : ["Biography coming soon."];
    el.replaceChildren(...paragraphs.map((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      return p;
    }));
  });
  set("member-facts", (el) => {
    const rows = [["Program", "EduBridge (GRIT EDU)"], ["Role", member.role], ["Responsible for", member.responsibilities]];
    el.replaceChildren(...rows.map(([label, value]) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = label;
      li.append(span, document.createTextNode(value));
      return li;
    }));
  });
})();
