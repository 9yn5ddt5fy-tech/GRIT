// Team members shown on member.html?m=<id>.
// To add a biography, write it in `bio` (one string per paragraph).
const TEAM = {
  bayarmagnai: {
    name: "Bayarmagnai Usukhgerel",
    role: "Founder of GRIT",
    photo: "assets/img/team-bayarmagnai.jpg?v=2",
    responsibilities: "Program lead: finance, organization, university application classes",
    bio: [],
  },
  namuunbayar: {
    name: "M. Namuunbayar",
    role: "Graphic Designer",
    photo: "assets/img/team-1.jpg?v=2",
    responsibilities: "Design and content",
    bio: [],
  },
  anar: {
    name: "B. Anar",
    role: "Teacher",
    photo: "assets/img/team-2.jpg?v=2",
    responsibilities: "Teaching",
    bio: [],
  },
  munkhdalai: {
    name: "B. Munkhdalai",
    role: "English Teacher",
    photo: "assets/img/team-3.jpg?v=2",
    responsibilities: "English, country information",
    bio: [],
  },
  enkhgerel: {
    name: "O. Enkhgerel",
    role: "Program Manager",
    photo: "assets/img/team-4.jpg?v=2",
    responsibilities: "Organization, country information",
    bio: [],
  },
  tulga: {
    name: "B. Tulga",
    role: "English Teacher",
    photo: "assets/img/team-5.jpg?v=2",
    responsibilities: "English, cooking",
    bio: [],
  },
  batzorigt: {
    name: "G. Batzorigt",
    role: "Teacher",
    photo: "assets/img/team-batzorigt.jpg?v=2",
    responsibilities: "Teaching",
    bio: [],
  },
  nomin: {
    name: "B. Nomin",
    role: "Teacher",
    photo: "assets/img/team-nomin.jpg?v=2",
    responsibilities: "English, country information",
    bio: [],
  },
  namuun: {
    name: "J. Namuun",
    role: "Teacher",
    photo: "assets/img/team-namuun.jpg?v=2",
    responsibilities: "University applications, country information",
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
    const rows = [["Program", "GRIT EDU program"], ["Role", member.role], ["Responsible for", member.responsibilities]];
    el.replaceChildren(...rows.map(([label, value]) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = label;
      li.append(span, document.createTextNode(value));
      return li;
    }));
  });
})();
