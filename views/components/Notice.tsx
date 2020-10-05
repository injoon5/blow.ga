import * as React from 'react';

class Notice extends React.Component<{ content: string }> {
  render() {
    return (
      <div className="Notice">
        <link rel="stylesheet" href="/Notice.css" />
        <div className="icon"></div>
        <div className="title">공지</div>
        <div className="content">{this.props.content}</div>
      </div>
    );
  }
}

export default Notice;
