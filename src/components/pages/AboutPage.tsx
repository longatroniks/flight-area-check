import React from 'react';
import { aboutPageContent } from '../../assets/static-values';

const AboutPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] p-6">
      <div className="flex flex-col gap-6 w-full max-w-6xl">
        <div className="text-center">
          <h1 className="text-h3 md:text-h1 font-heading font-light">
            {aboutPageContent.title}
          </h1>
          <p className="text-h6 md:text-h4 font-sans font-light text-gray-500 mt-2">
            {aboutPageContent.description}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-h5 font-semibold">
            {aboutPageContent.projectOverview.heading}
          </h2>
          <p className="mt-4">{aboutPageContent.projectOverview.content}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-h5 font-semibold">
            {aboutPageContent.howToUse.heading}
          </h2>
          <ol className="mt-4 list-decimal pl-6">
            {aboutPageContent.howToUse.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="mt-8">
          <h2 className="text-h5 font-semibold">
            {aboutPageContent.technologies.heading}
          </h2>
          <p className="mt-4">{aboutPageContent.technologies.content}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
