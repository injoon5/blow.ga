import * as React from 'react';
import fetch from 'node-fetch';
import Manifest from './components/Manifest';
import Notice from './components/Notice';

interface Props {
  title: string;
  notice: string;
}

export default class extends React.Component<Props, { style: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      style: { opacity: 0 },
    };
  }
  shorten(e: any) {
    e.preventDefault();
    console.log(fetch);
  }
  render() {
    return (
      <>
        <head>
          <Manifest />
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/fonts.css" />
          <link rel="stylesheet" href="/index.css" />
        </head>
        <body onClick={() => console.log('t')}>
          <main>
            <a className="home" href="/">
              돌아가기
            </a>
            <h1 style={{ fontWeight: 800 }}>
              <span style={{ color: '#007eff' }}>Blow.</span>
            </h1>
            <form onSubmit={(e: any) => this.shorten(e)}>
              <input type="url" placeholder="단축할 URL (필수)" />
              <input type="text" placeholder="커스텀 링크" />
              <input type="submit" value="단축" />
            </form>
            <Notice content={this.props.notice} />
          </main>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              document.querySelector('form').addEventListener('submit', async e => {
                e.preventDefault()
                document.querySelector('a').style.top = (document.querySelector('main').offsetTop + 12) + 'px'
                document.querySelector('a').style.left = (document.querySelector('main').offsetLeft + 12) + 'px'
                let url = 'test'
                window.copy = e => {

                }
                let data = {}
                if (e.target[1].value === '') {
                  data = { url:e.target[0].value }
                } else {
                  data = { url:e.target[0].value, custom:e.target[1].value }
                }
                let create = await fetch('https://blow.ga/api/shorten', {
                  method: 'POST',
                  body: JSON.stringify(data),
                  headers:{
                    'Content-Type': 'application/json'
                  }
                })
                if (create.status === 400) {
                  alert(await create.text())
                  return
                } else {
                  url = await create.text()
                }
                console.log(create)
                document.querySelector('h1').innerHTML = '단축된 URL:'
                document.querySelector('form').innerHTML = '<input type="url" value="https://blow.ga/' + url + '"readonly><input type="submit" value="복사">'
                document.querySelector('form input[type="submit"]').addEventListener('click', e => {
                  e.preventDefault()
                  let input = document.querySelector('form input')
                  input.select()
                  input.setSelectionRange(0, 9999)
                  document.execCommand('copy')
                  alert('복사되었습니다!')
                })
                document.querySelector('a').style.display = 'flex'
              })
          `,
            }}
          ></script>
        </body>
      </>
    );
  }
}
