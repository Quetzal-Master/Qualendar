import React from 'react';
import { ReactComponent as AnimauxSvg } from '../assets/eventType/animaux.svg';
import { ReactComponent as SanteSvg } from '../assets/eventType/sante.svg';
import { ReactComponent as TravailSvg } from '../assets/eventType/travail.svg';
import { ReactComponent as MaisonSvg } from '../assets/eventType/maison.svg';
import { ReactComponent as BeauteSvg } from '../assets/eventType/beaute.svg';
import { ReactComponent as ArgentSvg } from '../assets/eventType/argent.svg';
import { ReactComponent as ReglageSvg } from '../assets/eventType/reglage.svg';
import { ReactComponent as VoitureSvg } from '../assets/eventType/car.svg';
import { ReactComponent as BirthdaySvg } from '../assets/eventType/birthday.svg';
import { ReactComponent as DefaultSvg } from '../assets/eventType/default.svg';

const getEventByType = (email, colorClass) => {
    let typeName = 'Default';
    let Svg = <DefaultSvg className={`${colorClass} event-default`}/>;
    let SvgOnly = DefaultSvg;

    // Check if email is not null before trying to split it
    if (email) {
        // Extract the part before '@' from the email
        const emailPrefix = email.split('@')[0];

        switch (emailPrefix) {
            case 'animaux.qualendar':
                typeName = 'Animaux';
                Svg = <AnimauxSvg className={`${colorClass}`} />;
                SvgOnly = AnimauxSvg;
                break;
            case 'sante.qualendar':
                typeName = 'Sante';
                Svg = <SanteSvg className={`${colorClass}`} />;
                SvgOnly = SanteSvg;
                break;
            case 'travail.qualendar':
                typeName = 'Travail';
                Svg = <TravailSvg className={`${colorClass}`} />;
                SvgOnly = TravailSvg;
                break;
            case 'maison.qualendar':
                typeName = 'Maison';
                Svg = <MaisonSvg className={`${colorClass}`} />;
                SvgOnly = MaisonSvg;
                break;
            case 'beaute.qualendar':
                typeName = 'Beauté';
                Svg = <BeauteSvg className={`${colorClass}`} />;
                SvgOnly = BeauteSvg;
                break;
            case 'argent.qualendar':
                typeName = 'Argent';
                Svg = <ArgentSvg className={`${colorClass}`} />;
                SvgOnly = ArgentSvg;
                break;
            case 'voiture.qualendar':
                typeName = 'Voiture';
                Svg = <VoitureSvg className={`${colorClass}`} />;
                SvgOnly = VoitureSvg;
                break;
            case 'anniversaire.qualendar':
                typeName = 'Anniversaire';
                Svg = <BirthdaySvg className={`${colorClass}`} />;
                SvgOnly = BirthdaySvg;
                break;
            case 'reglage.qualendar':
                typeName = 'Reglage';
                Svg = <ReglageSvg className={`${colorClass}`} />;
                SvgOnly = ReglageSvg;
                break;
            default:
                break;
        }
    }

    return { typeName, Svg, SvgOnly };
};

export default getEventByType;