export enum appRoutes {
  index = "/",
  dashboard = "/dashboard",
  marketplace = "/marketplace",
  leaderboard = "/leaderboard",
  admin = "/admin",
  register = "/register",
  login = "/login",
  unsdgs = "/unsdgs",
  profile = "/profile",
  tca = "/tca",
  fund = "/fund",
  govern = "/govern",
  endowment_admin = "/endowment-admin",
  donations = "/donations",
  donate = "/donate",
  donate_widget = "/donate-widget",
  gift = "/gift",
}

export enum governRoutes {
  index = "",
  pollDetails = "pollDetails",
}

export enum profileRoutes {
  overview = "overview",
  endowment = "endowment",
  programs = "programs",
  media = "media",
  governance = "governance",
}

export enum adminRoutes {
  //base routes
  index = "",
  proposal = "proposal",
  proposals = "proposals",
  templates = "templates",
  widget_config = "widget-config",

  //charity
  edit_profile = "edit-profile",
  withdraws = "withdraws",
  investments = "investments",
}
