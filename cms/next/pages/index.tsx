import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import styles from '../styles/index.module.scss';

declare global {
  interface Window {
    gtag: (name: string, value: string) => void;
  }
}

export default function IndexPage() {
  const [ isInit, setIsInit ] = useState(false);
  const [ img, setImg ] = useState<HTMLImageElement>(null);
  const [ text, setText ] = useState([]);
  const [ href, setHref ] = useState('');
  const [ novel, setNovel ] = useState('');
  const [ news, setNews ] = useState([]);
  const [ books, setBooks ] = useState([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (isInit) {
      return;
    }

    (async () => {
      const headers = { 'X-API-KEY': 'ff8c982b-1966-4d0f-be00-dc87ee00bc04' };

      await Promise.all([
        axios.get('https://54-novel.microcms.io/api/v1/novel', {
          headers
        }),
        axios.get('https://54-novel.microcms.io/api/v1/news', {
          headers
        }),
        axios.get('https://54-novel.microcms.io/api/v1/books', {
          headers
        }),
      ]).then((res) => {
        setNovel(res[0].data.novel);
        setNews(res[1].data.contents.reverse());
        setBooks(res[2].data.contents.reverse());
      });
    })();

    const imgElm = new Image();

    imgElm.onload = () => {
      setIsInit(true);
      setImg(imgElm);
    };
    imgElm.src = './frame.png';

    ([].slice.call(document.querySelectorAll('[data-ga]'))).forEach(function(elm: HTMLElement) {
      elm.addEventListener('click', () => {
        handleClickGa(elm);
      });
    });

    const txt = txtRef.current;

    setInterval(() => {
      setText([...txt.innerText]);
    }, 100);
  }, [isInit]);

  useEffect(() => {
    if (!img) {
      return;
    }

    const txt = txtRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const subCanvas = document.createElement('canvas');
    const subCtx = subCanvas.getContext('2d');

    subCanvas.width = subCanvas.height = GRID_SIZE;

    render();

    function render():void {
      canvas.width  = WIDTH;
      canvas.height = HEIGHT;

      ctx.save();
        ctx.drawImage(img, 0, 0);
      ctx.restore();

      ctx.save();
        subCtx.fillStyle = '#333';
        subCtx.textBaseline = 'middle';
        subCtx.textAlign = 'center';
        subCtx.font = TXT_SIZE + 'px serif';

        for (let i = 0; i < TXT_LENGTH; ++i) {
          const str = text[i];

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
      ctx.restore();
      setHref(canvas.toDataURL('image/png'));
    }

    function getX(i: number):number {
      return X_MARGIN - X_RANGE * (i / Y_LENGTH | 0);
    }

    function getY(i: number): number {
      return Y_MARGIN + Y_RANGE * (i % Y_LENGTH);
    }

    function setCharacterTransform(ctx: CanvasRenderingContext2D, c: string):void {
      let em  = TXT_SIZE,
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
  }, [text]);

  function getNewsItem(item, i) {
    return (
      <div
        key={ i }
        className={ styles.box }
      >
        <h1>{ item.title }</h1>
        <div dangerouslySetInnerHTML={{__html: item.html}} />
      </div>
    );
  }

  function getNews() {
    return news.map((item, i) => {
      return getNewsItem(item, i);
    });
  }

  function getBookBox(book, i) {
    return (
      <div
        key={ i }
        className={ styles['book-box'] }
      >
        <a
          data-ga={ `book$${i + 1}-picture` }
          className={ styles['book-link'] }
          href={ book.link }
          target="_blank"
        >
          <img
            src={ `${book.img.url}?w=260` }
            className={ styles['book-link-img'] }
          />
        </a>
        <a
          data-ga={ `book$${i + 1}-button` }
          className={ `${styles.btn} ${styles['book-link-btn']}` }
          href={ book.link }
          target="_blank"
        >書籍情報</a>
      </div>
    );
  }

  function getBookBoxes() {
    return books.map((book, i) => {
      return getBookBox(book, i);
    });
  }

  function handleClickGa(elm: HTMLElement) {
    window.gtag('event', String(elm.dataset.ga));
  }

  return (
    <div
      className={ styles.index }
      style={{ opacity: isInit ? 1 : 0 }}
     >
      <canvas
        ref={ canvasRef }
      />
      <div
        ref={ txtRef }
        className={ styles.txt } 
        contentEditable={ true }
        suppressContentEditableWarning={ true }
      >{ novel }</div>
      { getNews() }
      <a
        id="btn-download"
        className={ `${styles.btn} ${styles['btn-save']}` }
        href={ href }
        download="54"
      >規約に同意して画像を保存</a>
      <div className={ styles.box }>
        <h1>54字の物語 好評発売中!!</h1>
        <p>たった54字の新感覚ショートストーリー。<br />意味がわかるとゾクゾクする90の物語を収録!</p>
        { getBookBoxes() }
      </div>
      <a
        data-ga="thinking-footer"
        className={ styles.logo }
        href="https://thinking.co.jp/"
        target="_blank"
      >
        <img src="./logo.png" />
      </a>
    </div>
  );
}