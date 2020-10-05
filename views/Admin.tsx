import * as React from 'react';
import fetch from 'node-fetch';
import Manifest from './components/Manifest';
import Notice from './components/Notice';

interface Props {
  title: string;
  db: any;
  notice: string;
}

export default class extends React.Component<Props, { urls: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      urls: [],
    };
  }
  componentDidMount() {}
  render() {
    let db = this.props.db;
    let key = 0;
    for (let url in db[0].data) {
      ++key;
      let { urls } = this.state;
      urls.push(
        <tr className="item" key={key}>
          <td className="id">{url}</td>
          <td className="url">{db[0].data[url]}</td>
          <td className="manage">
            <button className="edit">수정</button>
            <button className="delete">삭제</button>
          </td>
        </tr>
      );
      this.setState(urls);
    }
    return (
      <>
        <head>
          <Manifest />
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/fonts.css" />
          <link rel="stylesheet" href="/index.css" />
        </head>
        <body>
          <main style={{ display: 'initial' }}>
            <h1 style={{ fontWeight: 800 }}>
              <span style={{ color: '#007eff' }}>Admin</span>
            </h1>
            <table className="urls">
              <tr>
                <th>ID</th>
                <th>대상 URL</th>
                <th>관리</th>
              </tr>
              {this.state.urls}
            </table>
            <Notice content={this.props.notice} />
            <button className="editNotice">공지 수정</button>
            <div style={{ marginBottom: '1rem' }}></div>
          </main>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              document.querySelectorAll('.delete').forEach(el => {
                el.addEventListener('click', async () => {
                  let create = fetch('https://blow.ga/api/delete', {
                    method: 'POST',
                    body: JSON.stringify({
                      id: el.parentNode.parentNode.querySelector('.id').innerHTML
                    }),
                    headers:{
                      'Content-Type': 'application/json'
                    }
                  }).then(() => {
                    window.location.reload()
                  })
                })
              })
              document.querySelector('.editNotice').addEventListener('click', async () => {
                window.content = prompt('공지 수정')
                fetch('https://blow.ga/api/editNotice?content=' + content)
              })
              `,
            }}
          ></script>
        </body>
      </>
    );
  }
}
