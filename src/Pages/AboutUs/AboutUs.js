import './AboutUs.scss';

import { useEffect } from 'react';

import { useLoadingContext } from '../../contexts/LoadingContext';

import { Typography } from '../../mui-imports';


import CommonPage from '../CommonPage/CommonPage';

export default function AboutUs() {

    const { setIsLoading } = useLoadingContext();

    useEffect(() => setIsLoading(false), [setIsLoading]);

    return (
        <CommonPage>
            <div className="about-us-photo-wrapper">
                <img src="/images/about-us-image-2.jpg" alt="" className='about-us-photo' />
            </div>
            <div className="about-us-info-wrapper">
                <Typography variant="h4" className="about-us-info-heading-text">About Us</Typography>
                <Typography variant="body1" className="about-us-info-body-text">
                    Automarkt was built by me, Svetoslav Borislavov. A young developer who loves creating web applications, both with client-side and server-side rendering.
                </Typography>
                <Typography variant="body1" className="about-us-info-body-text">
                    Experience with the following technologies: <b>Javascript</b>, <b>React</b>, <b>NodeJS</b>, <b>Express</b>, <b>Typescript</b>, <b>C#</b>, <b>ASP.NET Core</b>, Databases like <b>MongoDB</b>, <b>Microsoft SQL Server</b>,<b> PostgreSQL</b>, <b>MySql</b> and more...
                </Typography>
                <Typography variant="body1" className="about-us-info-body-text">
                    When facing a problem, I dive deep until I solve it while writing clean code and keeping the best practices. Learning new technologies gives me enjoyment
                </Typography>
                <Typography variant="body1" className="about-us-info-body-text">
                    My interest in programming began at the age of 14 (2018). I first started building static websites. After a pause, I began learning C# and different programming principles and learned how to use databases. Then I connected everything in an ASP.NET project for school. In the past months, Javascript got my attention. I first learned NodeJS, wrote a simple REST API with Express and then started building a React project while expanding the REST API. And here we are with my React project.
                </Typography>
                <div className="about-us-info-body-text">
                    <p>
                        <Typography variant="body1" component='span'>
                            Email: svetoslavb1234@gmail.com
                        </Typography>
                    </p>
                    <p>
                        <Typography variant="body1" component='span'>
                            Github: <a
                                href='https://github.com/Svetoslavb04'
                                className='navigation-link-element'
                                target="_blank"
                                rel='noreferrer'
                            >
                                https://github.com/Svetoslavb04
                            </a>
                        </Typography>
                    </p>
                    <p>
                        <Typography variant="body1" component='span'>
                            LinkedIn: <a
                                href='https://www.linkedin.com/in/svetoslav-borislavov-9b5162185'
                                className='navigation-link-element'
                                target="_blank"
                                rel='noreferrer'
                            >
                                https://www.linkedin.com/in/svetoslav-borislavov-9b5162185
                            </a>
                        </Typography>
                    </p>
                </div>
            </div>
        </CommonPage>
    )
}
