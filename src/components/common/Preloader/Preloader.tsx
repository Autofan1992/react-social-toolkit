import preloader from '../../../images/preloader.svg'

const Preloader = () => {
    return <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <img src={preloader} alt=""/>
    </div>
}

export default Preloader

