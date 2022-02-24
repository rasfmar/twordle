import SettingsIcon from "../../assets/settings.svg";

export default function SiteNav() {
  return (
    <div className="site-nav">
      <span className="site-nav__brand">Twordle</span>
      <div className="site-nav__settings">
        <img src={SettingsIcon} alt="settings icon" />
      </div>
    </div>
  );
}
