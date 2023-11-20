import CustomIcon from "@ant-design/icons";
import {
	faFileLines,
	faHeadphones,
	faNewspaper,
	faPenToSquare,
	faPodcast,
	faUser,
	faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewspaperCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faNewspaper} />} />
);

const PodcastCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faPodcast} />} />
);

const MusicCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faHeadphones} />} />
);

const DocumentCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faFileLines} />} />
);

const UserCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faUser} />} />
);

const AccountEditCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faPenToSquare} />} />
);

const DeliveryCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faTruckFast} />} />
);

export {
	AccountEditCustomIcon,
	DocumentCustomIcon,
	MusicCustomIcon,
	NewspaperCustomIcon,
	PodcastCustomIcon,
	UserCustomIcon,
	DeliveryCustomIcon,
};
