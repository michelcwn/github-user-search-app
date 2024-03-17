"use strict";

// DOM ELEMENTS

// INPUT
const input = document.querySelector(".search__input");
const btn = document.querySelector(".search__button");

// USER ELEMENTS
const userImage = document.querySelector(".user__image-avatar");
const userImageResponsive = document.querySelector(
  ".user-info__image-resposive"
);
const userName = document.querySelector(".user__name");
const userNickname = document.querySelector(".user__nickname");
const userJoined = document.querySelector(".user__joined");
const userBio = document.querySelector(".user__bio");

// ACTIVITY
const userRepos = document.querySelector(".user__activity-item--repos");
const userFollowers = document.querySelector(".user__activity-item--followers");
const userFollowing = document.querySelector(".user__activity-item--following");

// SOIAL LINK
const userLocation = document.querySelector(".user__social-item--location");
const userTwitter = document.querySelector(".user__social-item--twitter");
const userWebsite = document.querySelector(".user__social-item--website");
const userCompany = document.querySelector(".user__social-item--company");
const userSocialItem = document.querySelector(".user__social-item");

// DARK
const themeSwitcher = document.querySelector(".theme-switcher");
const themeSwitcherLabel = document.querySelector(".theme-switcher__label");
const themeSwitcherIcon = document.querySelector(".theme-switcher__icon");
const themeSwitcherIconSun = document.querySelector(
  ".theme-switcher__icon-sun"
);
const themeSwitcherIconMoon = document.querySelector(
  ".theme-switcher__icon-moon"
);
const mainTitle = document.querySelector(".main__title");
const body = document.querySelector("body");
const searchBar = document.querySelector(".search");
const searchInput = document.querySelector(".search__input");
const user = document.querySelector(".user");
const userActivityItem = document.querySelectorAll(".user__activity-item ");
const userActivity = document.querySelector(".user__activity");

///////////////////////////////////
// DARK MODE///////////////////////////////////
///////////////////////////////////

themeSwitcher.addEventListener("click", function (e) {
  e.preventDefault();
  if (document.body.classList.contains("dark-theme")) {
    // change color
    body.style.color = "var(--color-white-dark)";
    searchInput.style.color = "var(--color-white-dark)";
    mainTitle.style.color = "var(--color-white-dark)";
    userName.style.color = "var(--color-white-dark)";
    userBio.style.color = "var(--color-white-dark)";
    userLocation.style.color = "var(--color-white-dark)";
    userTwitter.style.color = "var(--color-white-dark)";
    userCompany.style.color = "var(--color-white-dark)";
    userWebsite.style.color = "var(--color-white-dark)";
    userActivityItem.forEach((item) => {
      item.style.color = "var(--color-white-dark)";
    });

    // change BG color
    body.style.backgroundColor = "var(--color-light)";
    searchBar.style.backgroundColor = "var(--color-white)";
    searchInput.style.backgroundColor = "var(--color-white)";
    user.style.backgroundColor = "var(--color-white)";
    userActivity.style.backgroundColor = "var(--color-light)";

    // change text
    themeSwitcherLabel.textContent = "dark";

    // change icon
    themeSwitcherIconSun.classList.add("hidden");
    themeSwitcherIconMoon.classList.remove("hidden");

    // change state
    body.classList.remove("dark-theme");
  } else {
    body.style.color = "var(--color-white)";
    searchInput.style.color = "var(--color-white)";
    mainTitle.style.color = "var(--color-white)";
    userName.style.color = "var(--color-white)";
    userBio.style.color = "var(--color-white)";
    userLocation.style.color = "var(--color-white)";
    userTwitter.style.color = "var(--color-white)";
    userCompany.style.color = "var(--color-white)";
    userWebsite.style.color = "var(--color-white)";
    userActivityItem.forEach((item) => {
      item.style.color = "var(--color-white)";
    });

    // change BG color
    body.style.backgroundColor = "var(--color-white-dark)";
    searchBar.style.backgroundColor = "var(--color-white-dark-blue)";
    searchInput.style.backgroundColor = "var(--color-white-dark-blue)";
    user.style.backgroundColor = "var(--color-white-dark-blue)";
    userActivity.style.backgroundColor = "var(--color-white-dark)";

    // change text
    themeSwitcherLabel.textContent = "light";

    // change icon
    themeSwitcherIconSun.classList.remove("hidden");
    themeSwitcherIconMoon.classList.add("hidden");

    // change state
    body.classList.add("dark-theme");
  }
});

///////////////////////////////////
// API///////////////////////////////////
///////////////////////////////////

async function getUserInfo(username) {
  try {
    const userError = document.querySelector(".user__error");
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      if (response.status === 404) {
        userError.classList.remove("hidden"); // Rendre visible l'erreur si l'utilisateur n'est pas trouvé
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const {
      name,
      avatar_url,
      bio,
      created_at,
      login,
      followers,
      following,
      public_repos,
      location,
      company,
      blog,
      twitter_username,
    } = data;
    console.log(data);

    // Format Date
    const createdAt = created_at;
    const date = new Date(createdAt);
    const formatter = new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedDate = formatter.format(date);

    // DOM interaction

    userImage.src = avatar_url;
    userImageResponsive.src = avatar_url;
    userName.textContent = name;
    userNickname.textContent = `@${login}`;
    userJoined.textContent = `joined ${formattedDate}`;
    userBio.textContent = bio;
    userRepos.textContent = public_repos;
    userFollowers.textContent = followers;
    userFollowing.textContent = following;
    userLocation.textContent = location;
    userTwitter.textContent = twitter_username;
    userWebsite.textContent = blog;
    userWebsite.href = blog;
    userCompany.textContent = company;

    // if there are not data

    if (!data.location) {
      userLocation.textContent = "Not available";
      userLocation.closest(".user__social-item").classList.add("not-available");
    }
    if (!data.twitter_username) {
      userTwitter.textContent = "Not available";
      userTwitter.closest(".user__social-item").classList.add("not-available");
    }

    if (!data.twitter_username) {
      userTwitter.textContent = "Not available";
      userTwitter.closest(".user__social-item").classList.add("not-available");
    }
    if (!data.company) {
      userCompany.textContent = "Not available";
      userCompany.closest(".user__social-item").classList.add("not-available");
    }

    if (!data.blog) {
      userWebsite.textContent = "Not available";
      userWebsite.closest(".user__social-item").classList.add("not-available");
    }
  } catch (error) {
    console.error("Could not fetch user data:", error);
  }
}

// getUserInfo("jonasschmedtmann");

btn.addEventListener("click", function (e) {
  e.preventDefault();
  getUserInfo(input.value);
  input.value = "";
});

input.addEventListener("keypress", function (e) {
  // Vérifiez si la touche pressée est 'Enter'
  if (e.key === "Enter" || e.keyCode === 13) {
    e.preventDefault();
    getUserInfo(input.value);
    input.value = "";
  }
});
