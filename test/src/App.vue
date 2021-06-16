<template>
  <div class="page" >  
    <div data-scroll-container  id="js-scroll" >
      <div data-scroll data-scroll-speed="1" class="box red"></div>
      <div data-scroll data-scroll-speed="2" class="box blue"></div>
      <div data-scroll data-scroll-call="sayHi, green" data-scroll-speed="1" class="box green"></div>
      <div data-scroll data-scroll-call="test, test" data-scroll-speed="10" class="box red"></div>
      <div data-scroll data-scroll-call="sayBye, blue" data-scroll-speed="1" class="box blue"></div>
      <div data-scroll data-scroll-speed="5" class="box green"></div>
      <div data-scroll data-scroll-speed="1" class="box blue"></div>
    </div>

    <div class="sticked-div" data-scroll data-scroll-sticky data-scroll-target="#sticky-target" ></div>

  </div>
</template>
<script>
// import TimelineMax from 'gsap/TimelineMax';

export default {
  
  data() {
    return {
      lmS: {
        class: ''
      }
    };
  },
  watch: {
    'lmS.class':{
      handler: function (val, oldVal) { 
        console.log(val, oldVal);
      },
      deep: true
    }
  },
  mounted() {
    
    this.$nextTick(function () {
      this.lmS = new this.locomotiveScroll({
        el: document.querySelector("#js-scroll"),
        smooth: true
      })
      console.log("lmS", this.lmS);
      this.lmS.on('call', this.handler)
    }.bind(this));
    
  },
  methods: {
    handler(caller) {
      console.log('caller:', caller);
      let [
        func,
        param,
       ] = caller;

      console.log('func', func)
      this[func](param);
    },
    sayHi(param){
      console.log('hi!',param);
    },
    sayBye(param){
      console.log('bye.',param);
    },
    test() {
      // alert('test')
    }
  }
};
</script>
<style scoped>
html.has-scroll-smooth {
  overflow: hidden; }

#js-scroll {
      position: relative;
    overflow: hidden;
}
.box {
  height: 50vh;
  width: 300px;
  margin: 100px 0;
}

.red {
  background: red;
}

.blue {
  background: blue;
}

.green {
  background: green;
}

.sticked-div {
  position: fixed;
  background: coral;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 300px;
}

#sticky-target {
  height: auto;
}
</style>

<!-- <template>
  <div data-scroll-container ref="scrollSections" id="app">
    <section data-scroll-section>
      <h1 data-scroll data-scroll-speed="1">{{mot}}</h1>
      <h2 data-scroll data-scroll-speed="3">lorem lorem lorem</h2>
    </section>
    <section data-scroll-section>
      <figure>
        <div class="container-image" data-scroll data-scroll-speed="-2">
          <img class="image-parallax" src="https://source.unsplash.com/random" alt="">
        </div>
      </figure>

    </section>
    <section data-scroll-section :data-scroll-call="sayHi">
      <h1 data-scroll data-scroll-speed="1">lorem</h1>
      <h2 data-scroll data-scroll-speed="3">lorem lorem lorem</h2>

    </section>
    <section data-scroll-section >
      <h1 data-scroll data-scroll-speed="1">lorem</h1>
      <h2 data-scroll data-scroll-speed="3">lorem lorem lorem</h2>
      <image source="https://source.unsplash.com/random" />

    </section>
    <section data-scroll-section>
      <h1 data-scroll data-scroll-speed="1" data-scroll-call="sayHi">lorem</h1>
      <h2 data-scroll data-scroll-speed="3">lorem lorem lorem</h2>
    </section>
    <section data-scroll-section>
      <h1 data-scroll data-scroll-speed="1">lorem</h1>
      <h2 data-scroll data-scroll-speed="5">lorem lorem lorem</h2>
      <image source="https://source.unsplash.com/random" />

    </section>
  </div>
</template>


// PARTIE SCRIPT
<script>
  import locomotiveScroll from 'locomotive-scroll'
  export default {
    name: 'App',
    data() {
      return {
        cpt: 0,
        scrollIns: {
          class: ''
        },
        mot: ""
      }
    },
    mounted() {
      this.initLocoScroll();
      setInterval(() => {
        this.mot += "a"
      }, 1000);
    },
    created() {

    },
    methods: {
      sayHi() {
        console.log("test")
      },
      initLocoScroll() {
        this.scroll = new locomotiveScroll({
          el: this.$refs['scrollSections'],
          smooth: true,
          smoothMobile: true,
          getDirection: true
        });

      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .carre {
    transition: 4s;
    background: red;
    height: 20px;
    width: 20px;
  }

  section {
    height: 80vw;
  }

  figure {
    height: 800px;
    overflow: hidden;
  }

  .container-image {
    height: 120%;
    width: 100%;

    margin-top: -5px;
  }

  .image-parallax {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
</style>
-->