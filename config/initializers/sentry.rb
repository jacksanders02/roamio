# frozen_string_literal: true

unless ENV["RAILS_DISABLE_SENTRY"].present?
  Sentry.init do |config|
    # Sentry is only enabled when the dsn is set.
    unless Rails.env.development? || Rails.env.test?
      config.dsn = "https://f1b3eafae6b53805dd01adb98680b400@o4509558372302848.ingest.de.sentry.io/4509558373613648"
    end
    config.breadcrumbs_logger = [:active_support_logger, :http_logger]
    config.before_send = ->(event, _hint) {
      ActiveSupport::ParameterFilter.new(Rails.application.config.filter_parameters).filter(event.to_hash)
    }
    config.excluded_exceptions += [
      "ActionController::BadRequest",
      "ActionController::UnknownFormat",
      "ActionController::UnknownHttpMethod",
      "ActionDispatch::Http::MimeNegotiation::InvalidType",
      "CanCan::AccessDenied",
      "Mime::Type::InvalidMimeType",
      "Rack::QueryParser::InvalidParameterError",
      "Rack::QueryParser::ParameterTypeError",
      "SystemExit",
      "URI::InvalidURIError",
    ]
  end
end
