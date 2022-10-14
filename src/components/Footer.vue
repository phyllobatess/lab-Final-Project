<template>
  <section class="white-background footer">
    <div>
      <address>
        tasKing <br />
        557 Carrer Independencia, <br />
        08026 Barcelona, <br />
        Spain <br />
      </address>
    </div>
    <div>
      <h1>© 2021-2022 tasKing inc.</h1>
    </div>

    <div>
      <img class="img" src="/img/corona.jpeg" alt="coronaimg" />
    </div>
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
  display: flex;
  flex-direction: column;
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
.instaImg {
  width: 5%;
  margin: 0 0 0 0;
}

@media screen and (max-width: 768px) {
  .footer {
    padding: 0 0 0 0;
  }
  .background ul {
    display: none;
  }
}
</style>
