<template>
  <div class="index">
    <canvas
      ref="canvas"
      id="canvas"
    />
    <div
      ref="txt"
      id="txt" 
      contenteditable
    >{{ novel }}</div>
    <div
      v-for="item, i in news"
      :key="i"
      class="box"
    >
      <h1>{{ item.title }}</h1>
      <div v-html="item.html" />
    </div>
    <a
      :href="href"
      id="btn-download"
      class="btn btn-save"
      download="54"
    >規約に同意して画像を保存</a>
    <div class="box">
      <h1>54字の物語 好評発売中!!</h1>
      <p>たった54字の新感覚ショートストーリー。<br />意味がわかるとゾクゾクする90の物語を収録!</p>
      <div
        v-for="book, i in books"
        :key="i"
        class="book-box"
      >
        <a
          :data-ga="`book${i + 1}-picture`"
          :href="book.link"
          class="book-link"
          target="_blank"
        >
          <img
            :src="book.img.url"
            class="book-link-img"
          />
      </a>
        <a
          :data-ga="`book${i + 1}-button`"
          :href="book.link"
          class="btn book-link-btn"
          target="_blank">書籍情報</a>
      </div>
    </div>
    <a data-ga="thinking-footer" class="logo" href="https://thinking.co.jp/" target="_blank"><img src="~/assets/img/logo.png"></a>
  </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import delegate from 'delegate';
  import { Component, Vue } from 'nuxt-property-decorator';
  import frame from '~/assets/img/frame.png';

  declare global {
    interface Window {
      gtag: (name: string, value: string) => void
    }
  }

  @Component({
    async asyncData() {
      const headers = { 'X-API-KEY': '28b5c90f-7954-4d78-9bd6-516c1497263a' };

      return await Promise.all([
        axios.get('https://54ji.microcms.io/api/v1/novel', {
          headers
        }),
        axios.get('https://54ji.microcms.io/api/v1/news', {
          headers
        }),
        axios.get('https://54ji.microcms.io/api/v1/books', {
          headers
        }),
      ]).then((res) => {
        return {
          novel: res[0].data.novel,
          news: res[1].data.contents.reverse(),
          books: res[2].data.contents.reverse()
        };
      });
    }
  })
  export default class IndexPage extends Vue {
    href:string = '';

    mounted() {
      const WIDTH = 550;
      const HEIGHT = 550;
      const TXT_LENGTH = 54;
      const TXT_SIZE = 40;
      const X_MARGIN = 425;
      const Y_MARGIN = 51;
      const X_RANGE = 74.5;
      const Y_RANGE = 50;
      const X_LENGTH = 6;
      const Y_LENGTH = 9;
      const GRID_SIZE = 50;
      const img = new Image();
      const txt = this.$refs.txt as HTMLElement;
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const subCanvas = document.createElement('canvas') as HTMLCanvasElement;
      const subCtx = subCanvas.getContext('2d') as CanvasRenderingContext2D;

      delegate('[data-ga]', 'click', function (evt: {
        delegateTarget: HTMLElement
      }) {
        handleClickGa(evt.delegateTarget);
      });

      subCanvas.width = subCanvas.height = GRID_SIZE;
      img.onload = () => {
        setInterval(() => {
          render(this);
        }, 100);
      };
      img.src = frame;

      function render(instance: any) {
        canvas.width  = WIDTH;
        canvas.height = HEIGHT;

        ctx.save();
          ctx.drawImage(img, 0, 0);
        ctx.restore();

        subCtx.save();
          subCtx.fillStyle = '#333';
          subCtx.textBaseline = 'middle';
          subCtx.textAlign = 'center';
          subCtx.font = TXT_SIZE + 'px serif';

          const innerText = [...txt.innerText];

          for (let i = 0; i < TXT_LENGTH; ++i) {
            const str = innerText[i];

            if (str) {
              subCtx.save();
                subCtx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);
                subCtx.translate(GRID_SIZE / 2, GRID_SIZE / 2);
                setCharacterTransform(subCtx, str);
                subCtx.fillText(str, 0, 0);
              subCtx.restore();
              ctx.drawImage(subCanvas, getX(i), getY(i));
            }
          }
        subCtx.restore();

        instance.href = canvas.toDataURL('image/png');
      }

      function getX(i: number) {
        return X_MARGIN - X_RANGE * (i / Y_LENGTH | 0);
      }

      function getY(i: number) {
        return Y_MARGIN + Y_RANGE * (i % Y_LENGTH);
      }

      function setCharacterTransform(ctx: CanvasRenderingContext2D, c: string) {
        var em  = TXT_SIZE,
            deg = Math.PI / 180;

        switch (true) {
          case -1 < '。、．，'.indexOf(c):
            ctx.translate(0.7 * em, -0.6 * em);
            return;
          case -1 < '「」『』（）()＜＞<>〈〉【】［］《》｛｝'.indexOf(c):
            ctx.rotate(90 * deg);
            return;
          case -1 < '“'.indexOf(c):
            ctx.translate(0.4 * em, 0.1 * em);
            ctx.rotate(180 * deg);
            return;
          case -1 < '”'.indexOf(c):
            ctx.translate(-0.35 * em, -0.1 * em);
            ctx.scale(-1, 1);
            return;
          case -1 < '〝'.indexOf(c):
            ctx.translate(0.6 * em, 0.6 * em);
            ctx.scale(-1, 1);
            return;
          case -1 < '〟'.indexOf(c):
            ctx.translate(-0.6 * em, -0.65 * em);
            ctx.scale(-1, 1);
            return;
          case -1 < 'ー'.indexOf(c):
            ctx.scale(-1, 1);
            ctx.rotate(91.5 * deg);
            return;
          case -1 < '—…―〜'.indexOf(c):
            ctx.rotate(90 * deg);
            return;
          case -1 < '：；｜'.indexOf(c):
            ctx.rotate(90 * deg);
            return;
          case -1 < `'`.indexOf(c):
            ctx.rotate(90 * deg);
            return;
          case -1 < 'ぁぃぅぇぉゃゅょっァゥォュョッ'.indexOf(c):
            ctx.translate(0.1 * em, -0.1 * em);
            return;
          case -1 < 'ャ'.indexOf(c):
            ctx.translate(0.12 * em, -0.1 * em);
            return;
          case -1 < 'ィ'.indexOf(c):
            ctx.translate(0.2 * em, -0.1 * em);
            return;
          case -1 < 'ェ'.indexOf(c):
            ctx.translate(0.1 * em, -0.15 * em);
            return;
          case -1 < '.,-'.indexOf(c):
            ctx.rotate(90 * deg);
            return;
          case /[A-Za-z]/.test(c):
            ctx.rotate(90 * deg);
            return;
          case -1 < 'Ｑ'.indexOf(c):
            ctx.translate(0, -0.1 * em);
            return;
          case -1 < 'Ｊａｃｅｊｍｎｏｒｓｔｕｖｗｘｚ'.indexOf(c):
            ctx.translate(0, -0.15 * em);
            return;
          case -1 < 'ｇｐｑｙ'.indexOf(c):
            ctx.translate(0, -0.25 * em);
            return;
        }
      }

      function handleClickGa(elm: HTMLElement) {
        window.gtag('event', String(elm.dataset.ga));
      }
    }
  }
</script>

<style lang="scss" scoped>
  #canvas {
    margin: auto;
    display: block;
    width: 100%;
  }

  #txt {
    box-sizing: border-box;
    margin: 20px auto;
    padding: 5px;
    border-radius: 6px;
    width: 100%; height: 100px;
    background: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, .2) inset;
    overflow: hidden;
  }

  #txt:focus {
    outline: none;
  }

  .btn {
    display: block;
    border-bottom: solid #333 4px;
    border-radius: 12px;
    color: #eee;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: .2em;
    text-decoration: none;
    text-align: center;
    background: linear-gradient(#5a5a5a, #4e4e4e);
    box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
    user-select: none;
  }

  .btn-save {
    margin: 10px auto;
    width: 288px; height: 60px;
    line-height: 60px;
  }

  .box {
    box-sizing: border-box;
    margin: 20px auto;
    padding: 5px;
    max-width: 550px;
    width: 100%;
    font-size: 12px;
    background: #fff;
    overflow: hidden;
  }

  .box h1 {
    margin: 5px;
    font-size: 16px;
  }

  .box ul {
    margin: 5px auto 15px;
    padding-left: 20px;
    font-size: 10px;
  }

  .box p {
    margin: 5px;
  }

  .book-box {
    box-sizing: border-box;
    float: left;
    width: 50%;
    padding: 5px;
  }

  .book-link {
    width: 50%;
  }

  .book-link-img {
    width: 100%;
  }

  .book-link-btn {
    margin-top: 5px;
    height: 40px;
    line-height: 40px;
  }

  .logo {
    display: block;
    margin: 28px auto 20px;
    width: 100px;
  }

  .logo img {
    width: 100%;
  }
</style>
