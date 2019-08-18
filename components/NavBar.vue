<template>
  <div class="container">
    <nav
      class="navbar is-spaced has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <!-- <p class="subtitle is-3">Sport Gear</p> -->
          <img
            id="logo-name"
            class="is-hidden-mobile"
            src="~/assets/logo-name-line.png"
          />
          <img class="is-hidden-tablet" src="~/assets/logo-name.png" />
        </a>

        <div id="univer" class="navbar-item is-hidden-desktop">
          <user-label></user-label>
        </div>

        <!-- <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> -->
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <!-- menu bar -->
        <!-- <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>

          <a class="navbar-item">
            Documentation
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider" />
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div> -->

        <div class="navbar-end">
          <user-label></user-label>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import UserLabel from '~/components/UserLabel'
export default {
  components: {
    UserLabel
  }
}
</script>

<style>
nav {
  padding: 20px;
}

/* #logo-name {
  height: 40px;
  width: auto;
} */

#univer {
  margin-left: auto;
}
</style>
