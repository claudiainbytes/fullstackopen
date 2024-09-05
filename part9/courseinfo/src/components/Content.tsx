import Part from './Part';

import { CoursePart } from './../types';

const Content = ({parts}: {parts: CoursePart[]}) => 
                    parts.map((part: CoursePart, index: number) => <Part key={index} coursepart={part} /> 
                ); 

export default Content;
