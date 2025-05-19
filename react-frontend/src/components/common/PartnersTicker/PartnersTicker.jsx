import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPartners } from '../../../store/partnersSlice';

function PartnersTicker() {
  const dispatch = useDispatch();
  const { partners } = useSelector((state) => state.partners);

  React.useEffect(() => {
    dispatch(getPartners());
  }, [dispatch]);

  return (
    <div className="partners_line">
      <div className="partners_ticker">
        <div className="partners_ticker__in" id="partners_ticker">
          {partners.map((partner) => (
            <span className="ticker__item_partners" key={partner.id}>
              <a href={partner.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={`http://localhost:8000${partner.logo}`}
                  alt={partner.name}
                  loading="lazy"
                />
              </a>
            </span>
          ))}
          {[...partners, ...partners].map((partner, idx) => (
            <span className="ticker__item_partners" key={`${partner.id}-${idx}`}>
              <a href={partner.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={`http://localhost:8000${partner.logo}`}
                  alt={partner.name}
                  loading="lazy"
                />
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartnersTicker;
