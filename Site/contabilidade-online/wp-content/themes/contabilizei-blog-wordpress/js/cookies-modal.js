document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("acceptCookie") !== "true") {
    document.getElementById("modalCookie").style.display = "flex";
  } else {
    document.getElementById("modalCookie").style.display = "none";
  }

  const url = "/politica-cookies/";

  document.getElementById("linkPoliticaPrivacidade").setAttribute("href", url);
});

async function acceptCookie() {
  if (localStorage.getItem("acceptCookie") === "true") {
    document.getElementById("modalCookie").style.display = "none";
  } else {
    localStorage.setItem("acceptCookie", true);
    document.getElementById("modalCookie").style.display = "none";

    const now = new Date();
    const getGa = ga.getAll()[0];
    const ua = navigator.userAgent;

    let device = "";

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      device = "tablet";
    } else if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      device = "mobile";
    } else {
      device = "desktop";
    }

    const ip = await this.findIp();

    const isProd = window.location.host.includes("contabilizei.com.br");

    let url = "";

    if (isProd) {
      url =
        "https://api.contabilizei.com.br/aqs/aceites-cookie";
    } else {
      url =
        "https://api-dev.contabilizei.com.br/aqs/aceites-cookie";
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: getGa.get("clientId") || "",
        userId: "",
        email: "",
        sessionId: Cookies.get("_gasessionid") || "",
        ip: ip.ip || "",
        device: device,
        dataAceiteCookie: now.toISOString(),
        aceiteCookie: true,
        userAgent: ua,
        versaoContrato: "v1",
      }),
    });
  }
}

function findIp() {
  return jQuery.get("https://api.ipify.org/?format=json");
}
