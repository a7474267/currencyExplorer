<template>
  <div class="container">
    <div class="searchBox">
      <input
        type="text"
        v-model="currencyCode"
        placeholder="請輸入想查詢的貨幣代碼"
      />
      <button @click="checkRate" class="button">查詢</button>
    </div>
    <p class="ipBox">
      您的IP位置是:<span>{{ ip }}</span>
    </p>
    <p class="countryBox">
      您來自: <span>{{ city }},{{ country }}</span>
    </p>
    <ul>
      <li>貨幣種類</li>
      <li v-for="item in currencyData" :key="item.currencyCode">
        <flag :iso="item.currencyCode.slice(0, 2)"></flag>
        {{ item.currencyCode }}
        {{ item.currencyRate }}
      </li>
    </ul>
  </div>
</template>
<script>
import FlagIcon from "vue-flag-icon";
export default {
  data() {
    return {
      currencyBaseUrl: "https://v6.exchangerate-api.com/v6/",
      ipBaseUrl:
        "https://ipgeolocation.abstractapi.com/v1/?api_key=430b6272b56648d59bfe881036789619",
      currencyData: [],
      currencyCode: "",
      currencyCodes: [],
      ip: "",
      country: "",
      city: "",
    };
  },
  methods: {
    getCurrencyData(currencyCode) {
      this.axios
        .get(
          `${this.currencyBaseUrl}${process.env.VUE_APP_KEY}/latest/${currencyCode}`
        )
        .then((res) => {
          let [currencyCodes, currencyRates] = [
            Object.keys(res.data.conversion_rates),
            Object.values(res.data.conversion_rates),
          ];
          this.currencyCodes = currencyCodes;
          currencyCodes.forEach((item, index) => {
            this.currencyData.push({
              currencyCode: currencyCodes[index],
              currencyRate: currencyRates[index],
            });
          });
        });
    },
    getCurrencyCode() {
      this.axios
        .get(`${this.ipBaseUrl}`)
        .then((res) => {
          console.log(res);
          this.currencyCode = res.data.currency.currency_code;
          this.ip = res.data.ip_address;
          this.country = res.data.country;
          this.city = res.data.city;
        })
        .then(() => {
          this.getCurrencyData(this.currencyCode);
        });
    },
    checkRate() {
      if (!this.checkCurrencyInput()) return;
      this.currencyData = [];
      this.getCurrencyData(this.currencyCode);
    },
    checkCurrencyInput() {
      console.log(this.currencyCodes.indexOf(this.currencyCode));
      if (this.currencyCode.length !== 3) {
        alert("請輸入三碼的貨幣代碼!");
        return false;
      }
      if (this.currencyCodes.indexOf(this.currencyCode) === -1) {
        alert("請輸入正確的貨幣代碼!(需大寫)");
        return false;
      }
      return true;
    },
  },
  created() {
    this.getCurrencyCode();
  },
};
</script>
<style lang="scss">
.container {
  .searchBox {
    margin: 0 auto;
    width: 340px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    .button {
      margin-left: 10px;
      cursor: pointer;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      padding: 5px;
      border: 1px solid #a12727;
      border-radius: 8px;
      background: #753f3f;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#753f3f),
        to(#c44747)
      );
      background: -moz-linear-gradient(top, #753f3f, #c44747);
      background: linear-gradient(to bottom, #753f3f, #c44747);
      -webkit-box-shadow: #ff5959 0px 0px 40px 0px;
      -moz-box-shadow: #ff5959 0px 0px 40px 0px;
      box-shadow: #ff5959 0px 0px 40px 0px;
      text-shadow: #591717 1px 1px 1px;
      font: normal normal bold 15px arial;
      color: #ffffff;
      text-decoration: none;
    }
    .button:hover,
    .button:focus {
      background: #8c4c4c;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#8c4c4c),
        to(#eb5555)
      );
      background: -moz-linear-gradient(top, #8c4c4c, #eb5555);
      background: linear-gradient(to bottom, #8c4c4c, #eb5555);
      color: #ffffff;
      text-decoration: none;
    }
    .button:active {
      background: #462626;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#462626),
        to(#c44747)
      );
      background: -moz-linear-gradient(top, #462626, #c44747);
      background: linear-gradient(to bottom, #462626, #c44747);
    }
    .button:before {
      content: "\0000a0";
      display: inline-block;
      height: 24px;
      width: 24px;
      line-height: 24px;
      margin: 0 4px -6px -4px;
      position: relative;
      top: 0px;
      left: 0px;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEyUlEQVRIia2VWWxUVRjHf3eZdtpO22mBllLoxmJlqYQoYGgCQRQTECsEeYFEARMNlAhqDMENH/TBGE0gMUaECIlRHwgoS9WoUJo2NlBDF1onZeje6Uw7nX3mTu/c48O9YG3ApAlf8uXmnnvO//8t/3M/hWlazQIKquew6tFcZsgpYiMaieli/K9dfb3wlBi+JoT7oghc/VhrO/78tR92pO8usmN/KAS/HJjzvYgOCBHuFyIyIETMI8RQvXCfeKHz8/VUT90vT5tBGJAMgBaExDjEfJDmpHzrR5V73//gtzPbM3dP3q5On0CAFoKUAYi7iwBkLdyQtm2/8WUg/KGnto5LAMp08Xc9JrbPd0aWoI1Cei4YE6AnQI+DHsfmnCfPzY48/WfT3yf7o8SVqpk41hazoMPP2KSQHmhbyie2Z/lal0Q66pHddaTl54M9zyRIxUGPkT27JGt2oDH1bUvid+V4jXTgyOFd5/aunbXnpRXyyo0lodxkTES7/Izfj7C6lLU5dpbaVGyJhEbK3UxmUTGoGRaBpVrNO+/E5f4vpDPbOLrzwL73cJSaeMkAEz630d/f2xMaHmh0uwd/PtksGi9247Y48iWJssoZVL7yOC9vWsj6ueVFcmb1q2Ck7oWUHGlnY+3ZZWpcI8W4G2QHYABgyyuRK/LLKlhuVCxPBXdufrHPGBga6o74hhvaXb5fv2qg4UovLYfquNQf5N23czyHMrV+kDJMAkOQZldZMIsStd2HSwT6kLJLTAkKARIgC9MlSJsxR64oKF6EZCyqWh/avXWHx2i50Va35mho02dNHH12mVj3jDG2AinLjNEAxpqRFFS1cYCu6JgPR8G4maIEKMLUlxDWTbHylsx3u+yX08bClZgyD8m5GV0o2gr0pAnu7wStB0kGtcPDgNcfCjgSY04QoP5X22BlJARIAjHswts0QiiKDhjvPMXilasLt2AETckGu0HzgwQTExhqPEVgNJjoqwh0OsmaCZL8L6g0CVykSN3uwdMSY0gjdPomn5zYxfqazXmncgrtDjS3eavRIR1iXhgKM6oC+ngMN4mhKgwPZGRBRibINpClSeVJQaFE1nIbxojwH1ktvzW/PG2RrEzAhMvsXxpmaTXovUOgqR+3CuAJcwuFGhQDCIMeNmsvySDLoEiAhJItcDph1RJRhpgAkTT5JauxuvlMtEOrl/pQwsyA1hFumvqc6oblVjsVTGLZAhWWG0DK/K63wdAg+ulWjgGGCnD1Dq64Bhk5FogNSFqHHdaaOoVkKkES9Gbw3oYLvZy+dIt6rCO0DTHgjRAoLcKJCgTBfwMMA/LKQFkGFGDWWJ7kmPXmDkQaYFyDa16uHPyRw1aIJkEyRcAXpK9UxSmGwdcJgwYRRUKN9mDPvA2OYkh/BOTZgN2stz4KcRcE+yApMC70cPaN8xw0DLwW/b15oAfH6DY6qPL6wK3jefMyr/mjxGrXUPtkMesK/TiUZrDZQVFNBaNDJIlxw8+tr69z7Kc2vgNCTLJ7A2cwTvtIgK1/RWnfd449PaNcB4z9Z2nItrP4uaVsWFnCE7McFNgU1HCSgMuH63wbf3QN0wiMcvdndj/bUsXqT2v4JjOdigduMovjAHKATKY5EWXMNj5U+wcb0TIr9nRDzwAAAABJRU5ErkJggg==")
        no-repeat left center transparent;
      background-size: 100% 100%;
    }
  }
  ul {
    width: 200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  li {
    display: inline-block;
    border-bottom: 1px dashed black;
    padding: 10px;
  }
  .ipBox,
  .countryBox {
    text-align: center;
  }
}
</style>
