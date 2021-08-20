import Modal from 'react-modal'

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root')
}

export default props => (
  <Modal
    isOpen={props.isOpen}
    onAfterOpen={props.onAfterOpen}
    onRequestClose={props.onRequestClose}
    style={{
      content: {
        position: 'absolute',
        top: '80px',
        left: 0,
        right: 0,
        width: props.width ? `${props.width}px` : '710px',
        margin: '0px auto',
        bottom: 'auto',
        height: props.height ? `${props.height}px` : '500px'
      }
    }}
    ariaHideApp={props.ariaHideApp || false}
    contentLabel={props.contentLabel}
  >
    {props.children}
  </Modal>
)
