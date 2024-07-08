import { getMetadata } from "../../scripts/aem.js";
import utility from "../../utility/utility.js";
import { loadFragment } from "../fragment/fragment.js";

const list = [];
const currentURL = window.location.href;
const isNexa = currentURL.includes("nexa");

function toggleMenu() {
  document.getElementById("menu").classList.toggle("hidden");
}

function toggleCarMenu() {
  document.getElementById("carFilterMenu").classList.toggle("hidden");
}

function toggleUserDropdown() {
  const navRight = document.getElementById("nav-right");
  navRight.querySelector(".sign-in-wrapper").classList.toggle("hidden");
}

export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata("nav");
  const navPath = navMeta
    ? new URL(navMeta, window.location).pathname
    : "/common/nav";
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = "";
  const nav = document.createElement("nav");
  nav.id = "nav";
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
  Array.from(
    nav.querySelectorAll("nav > div.section:not(:first-child):not(:last-child):not(:nth-last-child(2))")
  ).forEach((el) => {
    const heading = el.querySelector(".icontitle :is(h1,h2,h3,h4,h5,h6)");
    const icon = el.querySelector(".icon");
    const iconClicked = el.querySelector(".iconClicked");
    const [content] = Array.from(el.children).slice(1);
    let teaserWrappers,
      combinedTeaserHTML = "",
      teaser;
    if (content?.classList.contains("car-filter-wrapper")) {
      teaserWrappers = el.querySelectorAll(".teaser-wrapper");
      teaserWrappers.forEach((teaserWrapper) => {
        combinedTeaserHTML += teaserWrapper.innerHTML;
      });

      el.querySelector(".card-list-teaser")?.insertAdjacentHTML(
        "beforeend",
        utility.sanitizeHtml(
          `<div class="teaser-list">${combinedTeaserHTML}</div>`
        )
      );
    } else {
      teaser = el.querySelector(".teaser-wrapper");
    }
    list.push({
      heading: heading?.textContent,
      icon: icon?.innerHTML,
      iconClicked: iconClicked?.innerHTML,
      content: content?.firstChild,
      teaser: teaser?.firstChild ?? "",
    });
  });
  const logo = nav.querySelector(".logo-wrapper");
  const carIcon = nav.children[1].querySelector(".icon")?.innerHTML;
  const carFilter = nav.querySelector(".car-filter");
  const user__dropdownDiv = nav.querySelector(
    ".sign-in-wrapper .user__dropdown"
  );
  const contact = nav.querySelector(".contact-wrapper");
  user__dropdownDiv.append(contact);
  const userDropdown = nav.querySelector(".sign-in-wrapper");
  userDropdown.classList.add("hidden");
  const userAccountLinkItems =
    user__dropdownDiv.querySelectorAll(".user__account>a");
  const signInTeaser = nav.querySelector(".sign-in-teaser");
  const locationHtml=nav.querySelector('.location-wrapper');

  const desktopHeader = `
    <div class="navbar ${isNexa ? "navbar-nexa" : "navbar-arena"}">
      <div class="nav-hamburger ${isNexa && "nav-hamburger-nexa"}">
      <button type="button" aria-controls="nav" aria-label="Open navigation">
        <span class="nav-hamburger-icon"></span>
      </button>
    </div>
      ${logo.outerHTML}
      <div class="links"></div>
      <div class="right" id="nav-right">
        ${!isNexa ? `<div class="language">EN &#9662;</div>` : ""}
        <img id="user-img" src="../../icons/${
          isNexa ? "account_circle" : "user"
        }.svg" alt="user" />
        ${userDropdown.outerHTML}
      </div>
      <div class="car-icon">${carIcon}</div>
    </div>
    <div class="car-filter-menu hidden ${
      isNexa ? "car-filter-nexa" : "car-filter-arena"
    }" id="carFilterMenu">
    <div class="car-panel-header">
      <div></div>
      <span class="car-text">Cars</span>
      <span class="car-filter-close"><img src="../../icons/${
        isNexa ? "close_white" : "close"
      }.svg" alt="close" /></span>
    </div>
      </div>
  `;

  const mobileHeader = `
    <div id="menu" class="menu hidden ${isNexa ? "menu-nexa" : "menu-arena"}">
      <div class="menu-header ${isNexa && "menu-header-nexa"}">
        <div class="back-arrow"><img src="../../icons/${
          isNexa ? "chevron_left_white" : "chevron_left"
        }.svg" alt="back" /></div>
        <span class="menu-title">Menu</span>
        <span class="close-icon"><img src="../../icons/${
          isNexa ? "close_white" : "close"
        }.svg" alt="close" /></span>
      </div>
      <ul class="menu-list"></ul>
    </div>
  `;
  const navWrapper = document.createElement("div");
  navWrapper.innerHTML = desktopHeader + mobileHeader;
  navWrapper.querySelector('.right').insertAdjacentElement("afterbegin",locationHtml);
  block.append(navWrapper);
  const navHamburger = document.querySelector(".nav-hamburger");
  const backArrow = document.querySelector(".back-arrow");
  const closeIcon = document.querySelector(".close-icon");
  const caricon = document.querySelector(".navbar .car-icon");
  const carFilterClose = document.querySelector(".car-filter-close");
  [navHamburger, backArrow, closeIcon].forEach((element) => {
    element.addEventListener("click", toggleMenu);
  });

  caricon.addEventListener("click", toggleCarMenu);
  carFilterClose.addEventListener("click", toggleCarMenu);

  document
    .querySelector("#user-img")
    .addEventListener("click", () => toggleUserDropdown());

  const linkEl = document.querySelector(".links");
  const menuList = document.querySelector(".menu-list");

  if (isNexa) menuList.innerHTML += `<li>${signInTeaser.outerHTML}</li>`;

  list.forEach((el, i) => {
    const linkTitle = document.createElement("div");
    const desktopPanel = document.createElement("div");
    const heading = document.createElement("span");
    linkTitle.classList.add("link-title");
    heading.textContent = el.heading;
    linkTitle.append(heading);
    desktopPanel.classList.add(
      "desktop-panel",
      "panel",
      el.heading?.split(" ")[0].toLowerCase()
    );
    if (el.content) desktopPanel.append(el.content);
    if (el.teaser) desktopPanel.append(el.teaser);
    linkEl.append(linkTitle, desktopPanel);
    if (i === 0) return;
    menuList.innerHTML += `<li id="menu-item-${i}" class="${
      el.content?.innerHTML ? "accordion nav-link" : ""
    } ${el.heading?.toLowerCase()}" ><span class="icon">${
      el.icon
    }</span> <span class="menu-title">${el.heading}</span></li>
    ${
      el.content?.innerHTML || el.teaser?.innerHTML
        ? `<div class="panel">${el.content?.innerHTML || ""}${
            el.teaser?.innerHTML || ""
          }</div>`
        : ""
    }
    `;
  });

  if (!window.matchMedia("(min-width: 999px)").matches) {
    block.querySelector(".car-filter-menu")?.append(carFilter);
  }

  (isNexa
    ? Array.from(userAccountLinkItems).slice(1)
    : userAccountLinkItems
  ).forEach((el) => {
    menuList.innerHTML += `<li>${el.outerHTML}</li>`;
  });

  menuList.innerHTML += `<li>${contact.outerHTML}</li>`;

  const acc = document.getElementsByClassName("accordion");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function (e) {
      this.classList.toggle("active");
      const index = parseInt(this.getAttribute("id").split("-")[2]);
      const menuListIconWrapper = this.querySelector(".icon");
      const menuListTitle = this.querySelector(".menu-title");
      const { icon, iconClicked } = list[index];
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        menuListIconWrapper.innerHTML = icon;
        menuListTitle.classList.remove("menu-title-clicked");
        panel.style.maxHeight = null;
      } else {
        menuListIconWrapper.innerHTML = iconClicked;
        menuListTitle.classList.add("menu-title-clicked");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
