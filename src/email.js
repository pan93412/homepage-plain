class Email extends HTMLElement {
  REVDT0RFX1RISVNfVEVYVF9BTkRfRklORF9NRV9UT19HRVRfQV9XVEZfOik_ = "bWVAcGFuOTMuY29t";

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const linkElement = document.createElement("a");

    const email = atob(this.REVDT0RFX1RISVNfVEVYVF9BTkRfRklORF9NRV9UT19HRVRfQV9XVEZfOik_);
    linkElement.innerText = email;
    linkElement.href = `mailto: ${email}`;

    setTimeout(() => {
      shadow.appendChild(linkElement);
    }, Math.random() * 1145.14);
  }
}

customElements.define("x-email", Email);
