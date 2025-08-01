import backgroundImage from './assets/StoriesImageAssets/Banner Background Image.jpg';
import nextCorousalImage from './assets/StoriesImageAssets/Next Corousal Image.png';
import truffleTanglesImg from './assets/StoriesImageAssets/TruffleTangles.jpg';
import shoeDoctorImg from './assets/StoriesImageAssets/ShoeDoctor.jpg';
import automenImg from './assets/StoriesImageAssets/AutoMen.jpg';
import letsRydeImg from './assets/StoriesImageAssets/LetsRyde.jpg';
import modelloDomaniImg from './assets/StoriesImageAssets/ModelloDomani.jpg';
import singhsPhotoByShaanImg from './assets/StoriesImageAssets/SinghPhotoByShaan.jpg';
import celebrationCompanyImg from './assets/StoriesImageAssets/CelebrationCompany.jpg';
import travelConnectionImg from './assets/StoriesImageAssets/TravelConnection.jpg';
import savvyTreeImg from './assets/StoriesImageAssets/Savvytree.jpg';

const ASSETS_PATHS = {
  background: backgroundImage,
  nextCorousalImage: nextCorousalImage,
  truffleTanglesImg: truffleTanglesImg,
  shoeDoctorImg: shoeDoctorImg,
  automenImg: automenImg,
  letsRydeImg: letsRydeImg,
  modelloDomaniImg: modelloDomaniImg,
  singhsPhotoByShaanImg: singhsPhotoByShaanImg,
  celebrationCompanyImg: celebrationCompanyImg,
  travelConnectionImg: travelConnectionImg,
  savvyTreeImg: savvyTreeImg,
  videos: {
    truffleTangles: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/truffle-tangles.mp4',
    savvyTree: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/savvytree.mp4',
    shoeDoctor: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/shoe-doctor.mp4',
    singhsPhotoByShaan: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/singhs-foto-by-shaan.mp4',
    celebrationCompany: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/the-celebration-company.mp4',
    travelConnection: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/travel-connection.mp4',
    automen: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/automen.mp4',
    letsRyde: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/lets-ryde.mp4',
    modelloDomani: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/modello-domani.mp4'
  },
  hindiVideos: {
    truffleTangles: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/truffle-tangles-hindi.mp4',
    savvyTree: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/savvytree-hindi.mp4',
    shoeDoctor: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/shoe-doctor-hindi.mp4',
    singhsPhotoByShaan: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/singhs-foto-hindi-_wbhindi.mp4',
    celebrationCompany: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/celebration-company-hindi.mp4',
    travelConnection: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/travel-connection-hindi.mp4',
    automen: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/automen-hindinew.mp4',
    letsRyde: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/lets-ryde-hindi.mp4',
    modelloDomani: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/modello-domani-hindi.mp4'
  },
  marathiVideos: {
    truffleTangles: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/truffle-tangles-marathi.mp4',
    savvyTree: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/savvytree-marathi.mp4',
    shoeDoctor: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/shoe-doctor-marathi.mp4',
    singhsPhotoByShaan: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/singhs-foto-marathi.mp4',
    celebrationCompany: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/celebration-company-marathi.mp4',
    travelConnection: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/travel-connection-marathi.mp4',
    automen: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/automen-marathi.mp4',
    letsRyde: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/lets-ryde-marathi.mp4',
    modelloDomani: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/mondello-domani-marathi.mp4'
  },
  bengaliVideos: {
    truffleTangles: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/truffle-tangles-bengali.mp4',
    savvyTree: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/savvytree-bengali.mp4',
    shoeDoctor: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/shoe-doctor-bengali.mp4',
    singhsPhotoByShaan: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/singhs-foto-bengali.mp4',
    celebrationCompany: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/celebration-company-bengali.mp4',
    travelConnection: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/travel-connection-bengali.mp4',
    automen: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/automen-bengali.mp4',
    letsRyde: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/lets-ryde-bengali.mp4',
    modelloDomani: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/modello-domani-bengali.mp4'
  },
  tamilVideos: {
    truffleTangles: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/truffle-tangles-tamil.mp4',
    savvyTree: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/savvytree-tamil.mp4',
    shoeDoctor: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/shoe-doctor-tamil.mp4',
    singhsPhotoByShaan: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/singhs-foto-tamil.mp4',
    celebrationCompany: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/celebration-company-tamil.mp4',
    travelConnection: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/travel-connection-tamil.mp4',
    automen: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/automen-tamil.mp4',
    letsRyde: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/lets-ryde-tamil.mp4',
    modelloDomani: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/modello-domani-tamil.mp4'
  },
  gujaratiVideos: {
    truffleTangles: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/truffle-tangles-gujarati.mp4',
    savvyTree: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/savvytree-gujarati.mp4',
    shoeDoctor: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/shoe-doctor-gujarati.mp4',
    singhsPhotoByShaan: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/singhs-foto-gujarati.mp4',
    celebrationCompany: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/celebration-company-gujarati.mp4',
    travelConnection: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/travel-connection-gujarati.mp4',
    automen: 'https://storage.googleapis.com/joshtalks-data-collection-248zy39c/testing/automen-gujarati.mp4',
    letsRyde: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/lets-ryde-gujarati.mp4',
    modelloDomani: 'https://storage.googleapis.com/joshtalks-ias.appspot.com/meta/modello-domani-gujarati.mp4'
  }
};

export default ASSETS_PATHS;