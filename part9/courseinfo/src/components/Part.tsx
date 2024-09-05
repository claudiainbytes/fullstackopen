import { CoursePart } from './../types';

const Part = ({coursepart}: {coursepart: CoursePart}) => 
                                    {
                                        switch (coursepart.kind) {
                                            case "basic":
                                                return <p><b>{coursepart.name} {coursepart.exerciseCount}</b><br/><i>{coursepart.description}</i><br/></p>
                                                break;
                                            case "group":
                                                return <p><b>{coursepart.name} {coursepart.exerciseCount}</b><br/>project exercises {coursepart.groupProjectCount}</p>
                                                break;
                                            case "background":
                                                return <p><b>{coursepart.name} {coursepart.exerciseCount}</b><br/><i>{coursepart.description}</i><br/>{coursepart.backgroundMaterial}</p>
                                                break;
                                            case "special":
                                                return <p><b>{coursepart.name} {coursepart.exerciseCount}</b><br/><i>{coursepart.description}</i><br/>required skills: {coursepart.requirements.join(', ')}</p>
                                                break;
                                            default:
                                                break;
                                        }
                                    }

export default Part