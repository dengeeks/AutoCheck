import './Lightbox.css'            
import CloseIcon from '@mui/icons-material/Close';

const Lightbox = ({ isOpen, image, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={image} alt="Увеличенное изображение" />
                <div className="close-modal-container">
                    <CloseIcon className='close-modal-lightbox' onClick={onClose}/>
                </div>
            </div>
        </div>
    );    
};

export default Lightbox