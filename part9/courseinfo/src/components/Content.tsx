import { PartProp } from './../types';

const Content = ({parts}: {parts: PartProp[]}) => parts.map((part, k) => <p key={k}>{part.name} {part.exerciseCount}</p>);

export default Content;
