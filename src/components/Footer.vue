<template>
  <section class="white-background footer">
    <address>
      tasKing <br />
      557 Carrer Independencia, <br />
      08026 Barcelona, <br />
      Spain <br />
    </address>
    <img class="img" src="/img/corona.jpeg" alt="coronaimg" />

    <ul class="ul">
      <li><a href="#"> Twitter </a></li>
      <li><a href="#"> Facebook </a></li>
      <li><a href="#"> Instagram </a></li>
    </ul>
  </section>
</template>

<script setup></script>

<style>
.img {
  height: 70px;
}
.ul {
  list-style: none;
  text-decoration: none;
}

.footer {
  font-size: 15px;
  text-align: center;
  padding: 40px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.white-background {
  background-color: white;

  border-top: 5px double #57699a;
}
</style>
