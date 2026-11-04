/**
 * Centralized Image Asset Registry
 *
 * Using ES Module imports ensures Vite bundles all images with correct hashed
 * asset URLs in both local dev, static export, and GitHub production builds.
 */

// Realistic Loop & Hero Backgrounds
import heroLuxurySuvKilimani from '../assets/images/hero_luxury_suv_kilimani_1793603898398.jpg';
import heroNairobiNightHighway from '../assets/images/hero_nairobi_night_highway_1793603899782.jpg';
import heroSafariPradoRiftValley from '../assets/images/hero_safari_prado_rift_valley_1793603901093.jpg';
import fleetShowroomLuxury from '../assets/images/fleet_showroom_luxury_1793603919585.jpg';
import cockpitDashboardInterior from '../assets/images/cockpit_dashboard_interior_1793603919741.jpg';

// Page & Section Specific Backdrops
import airbnbRentalBg from '../assets/images/airbnb_rental_bg_1793564134525.jpg';
import nairobiGuidesBg from '../assets/images/nairobi_guides_bg_1793564135430.jpg';
import contactUsBg from '../assets/images/contact_us_banner_bg_1793564136412.jpg';
import kilimaniLocationDepotBg from '../assets/images/kilimani_location_depot_bg_1793564137296.jpg';
import loyaltyVipLoungeBg from '../assets/images/loyalty_vip_concierge_lounge_1793603900725.jpg';

// Additional Scenic visuals
import heroKilimaniFleetBanner from '../assets/images/hero_kilimani_fleet_banner_1793562810160.jpg';
import nairobiExpresswayDrive from '../assets/images/nairobi_expressway_drive_1793562810227.jpg';
import toyotaPradoSafariExpedition from '../assets/images/toyota_prado_safari_expedition_1793562811687.jpg';
import vipAirportTransferChauffeur from '../assets/images/vip_airport_transfer_chauffeur_1793562812012.jpg';

export const APP_IMAGES = {
  // Looping Home Hero Slides (Vibrant Nairobi & Fleet Backdrops)
  heroSlides: [
    {
      image: heroLuxurySuvKilimani,
      headline: 'Prime Carhire Nairobi — Ojijo Rd Executive Fleet & Rapid Delivery',
      subline:
        'Self-drive & chauffeured Land Cruiser V8, Mercedes-Benz, Prado TX, Harrier, and Executive 8-seater vans delivered to your doorstep in Westlands, Parklands & Nairobi.'
    },
    {
      image: heroNairobiNightHighway,
      headline: 'VIP Nairobi Expressway Transfers & 24/7 Airport Handover',
      subline:
        'Direct airport reception at JKIA & Wilson Airport. Flight tracking, express luggage assistance, and zero toll delays.'
    },
    {
      image: heroSafariPradoRiftValley,
      headline: 'Rugged 4WD Safari Expeditions to Naivasha, Mara & Amboseli',
      subline:
        'Heavy-duty Prado 4x4 and Land Cruiser V8 machines equipped with all-terrain tires, roof racks, and comprehensive insurance.'
    },
    {
      image: fleetShowroomLuxury,
      headline: 'Handpicked Executive Fleet Maintained to Dealer Standards',
      subline:
        'Every vehicle is thoroughly sanitized, mechanical inspected, and prepared for seamless business or leisure driving.'
    },
    {
      image: cockpitDashboardInterior,
      headline: 'First-Class Cockpit Technology & Modern Comfort',
      subline:
        'Automatic transmissions, high-speed USB charging, pristine leather interiors, and child safety seats provided upon request.'
    }
  ],

  // Distinct Page & Section Backgrounds
  fleetHeaderBg: fleetShowroomLuxury,
  airbnbRentalBg: airbnbRentalBg,
  nairobiGuidesBg: nairobiGuidesBg,
  contactUsBg: contactUsBg,
  locationDepotBg: kilimaniLocationDepotBg,
  loyaltyVipLoungeBg: loyaltyVipLoungeBg,
  calculatorBg: cockpitDashboardInterior,

  // Fallbacks & Scenic
  heroKilimaniFleetBanner,
  nairobiExpresswayDrive,
  toyotaPradoSafariExpedition,
  vipAirportTransferChauffeur
};
