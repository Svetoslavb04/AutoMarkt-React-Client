import { Backdrop, Modal, Fade} from '../../mui-imports';

export default function TransitionsModal(props) {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.isOpened}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 800,
          sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }
        }}
      >
        <Fade in={props.isOpened}>
          {props.children}
        </Fade>
      </Modal>
    </div>
  );
}
