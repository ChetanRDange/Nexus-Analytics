// Authentication error

export const email_already_registred_error =
  "This email is already registered. Please log in or use a different email.";
export const valid_email_address_error = "Please enter a valid Email ID.";
export const valid_phone_number_error = "Please enter a valid phone number.";
export const pass_error =
  "Use at least 8 characters, including uppercase, lowercase, a number, and a special symbol.";
export const full_name_error = "This field is required. ";
export const company_name_error = "This field is required. ";
export const pass_symbol_missing_error =
  "Add a special symbol to your password.";
export const code_error = "Incorrect code. Please try again.";

// Admin Profile & User Prifle

export const invalid_credential_error =
  "Invalid input or credentials. Please try again.";
export const second_attempt_error =
  "Second unsuccessful attempt. Only 1 more attempt left.";
export const third_attempt_error =
  "Too many failed attempts. Try again after 24 hours.";

// Add User Flow

export const user_name_required_error = "This field is required. ";
export const user_email_required_error = "This field is required. ";
export const phone_error = "Invalid Phone Number";
export const role_required_error = "This is required. Please select it.";

export const user_full_name_error = "Please enter your full name";
export const email_invalid_error = "Invalid Email ID";
export const role_new_user_error = "Please assign a role for the new user.";

export const user_name_char_error =
  "The name contains numbers or special characters that are not allowed (e.g., @, #, $).";
export const email_fromat_error =
  "The email does not follow standard email format (e.g., missing '@' or domain).";
export const phone_min_length_error =
  "Too Short: The number is below the minimum required length (e.g., less than 10 digits).";

export const email_already_error = "This email is already in use.";
export const phone_max_length_error =
  "Too Long: The number exceeds the maximum allowed length(e.g., more than 15 digits)";

// Add Coupon

export const coupon_name_required_error = "This field is required. ";
export const coupon_code_required_error = "This field is required. ";
export const coupon_desc_required_error = "This field is required. ";
export const coupon_start_date_error = "This is an error message.";
export const coupon_end_date_error = "This is an error message.";
export const coupon_discount_type_required_error =
  "This is required. Please select it.";
export const coupon_discount_value_required_error =
  "This is required. Please select it.";
export const coupon_applicable_plan_required_error =
  "This is required. Please select it.";
export const coupon_target_audience_required_error =
  "This is required. Please select it.";
export const coupon_max_usage_required_error = "This field is required. ";

export const coupon_code_already_error =
  "This coupon code already exists. Please choose a different one.";
export const coupon_desc_charexceed_error =
  "Content cannot exceed 500 characters. Please shorten the description.";
export const coupon_start_date_valid_error =
  "The start date must be today or in the future.";
export const coupon_end_date_after_error =
  "The end date must be after the start date.";
export const coupon_discount_valid_value_error =
  "Please enter a valid positive number for the discount.";

// Add Email Blacklist

export const blacklist_email_required_error = "This field is required. ";
export const max_incorrect_login_attempt_required_error =
  "This field is required. ";
export const max_frequent_pass_required_error = "This field is required. ";
export const suspicious_location_required_error =
  "This field is required. Please fill it in";

export const blacklist_invalid_email_error = "Invalid Email ID";
export const invalid_incorrect_login_attempt_error =
  "Please enter a valid number of requests (e.g., 1-5).";
export const invalid_frequent_pass_error =
  "Please enter a valid number of requests (e.g., 1-5).";
export const invalid_location_error = "Please enter a valid location format.";

// Add Phone Blacklist

export const blacklist_phone_required_error = "This field is required. ";
export const fraudal_activity_required_error = "This field is required. ";
export const failed_otp_required_error = "This field is required. ";
export const max_two_fact_required_error =
  "This field is required. Please fill it in";

export const blacklist_invalid_phone_error = "Invalid Phone Number";
export const invalid_fraudal_activity_error =
  "Please enter a valid number of requests (e.g., 1-5).";
export const invalid_two_fact_error =
  "Please enter a valid number of requests (e.g., 1-5).";
export const invalid_max_two_fact_error =
  "Please enter a valid number of requests (e.g., 1-5).";

// Add IP Blacklist

export const ip_addr_required_error = "This field is required. ";
export const failed_login_required_error = "This field is required. ";
export const incorrect_from_required_error = "This field is required. ";
export const api_misuse_required_error = "This field is required. ";
export const ddod_attack_required_error =
  "This field is required. Please fill it in";

export const invalid_ip_addr_error = "Invalid Phone Number";
export const invalid_failed_login_error =
  "Please enter a valid number of requests (e.g., 1-5).";
export const invalid_incorrect_from_error =
  "Please enter a valid number of requests (e.g., 1-5).";
export const invalid_api_misuse_error =
  "Please enter a valid number of requests (e.g., 1-5).";

export const ip_addr_already_exist_error =
  "This IP address is already blacklisted";
export const invalid_ddod_attack_error =
  "Please enter a valid number for the request threshold.";

// Add Company

export const companyy_name_required_error = "This field is required. ";
export const fulll_name_required_error = "This field is required. ";
export const company_email_required_error = "This field is required. ";
export const phone_required_error = "This field is required. ";

export const companyy_already_exist_error =
  "A company with this name already exists";
export const invalid_full_name_error = "Please enter your full name";
export const invalid_company_email_error = "Invalid Email ID";
export const invalid_phone_error = "Invalid Phone Number";

// Add SMTP Settings

export const smtp_name_required_error =
  "SMTP Name is required. Please provide a valid SMTP name.";
export const smtp_host_required_error =
  "SMTP Host is required. Please provide a valid SMTP host.";
export const smtp_username_required_error =
  "SMTP Username is required. Please enter a valid username.";
export const smtp_pass_required_error =
  "SMTP Password is required. Please enter a valid password.";
export const smtp_port_required_error =
  "SMTP Port is required. Please enter a valid port number.";
export const from_name_required_error =
  "From Name is required. Please enter a valid name.";
export const from_email_required_error =
  "From Email cannot be empty. Please enter a valid Email ID.";
export const replyto_email_required_error =
  "Reply-To email address cannot be empty. Please provide a valid email.";
export const encryption_required_error =
  "Encryption type is required. Please select an option.";

export const smtp_name_alphabetic_only_error =
  "Please use alphabetic characters only.";

export const host_username_already_exist_error =
  "SMTP settings with this host or username already exist. Please use unique credentials.";
export const invalid_host_ip_error =
  "Please enter a valid hostname or IP address.";
export const invalid_username_format_error =
  "Please enter a valid email address or username format.";
export const pass_min_length_error =
  "SMTP Password must be at least 8 characters long.";
export const invalid_port_error =
  "Invalid SMTP Port. Please enter a valid port number (e.g., 25, 465, 587).";
export const from_name_alphabetic_only_error =
  "Please use alphabetic characters only.";
export const invalid_from_email_error =
  "Please enter a valid email address (e.g., name@example.com).";
export const invalid_replyto_email_error =
  "Please enter a valid email address (e.g., name@example.com).";

export const invalid_send_test_email_error =
  "Email address cannot be empty. Please enter a valid Email ID.";

// Brand Settings

export const company_dark_logo_format_error =
  "Please upload a valid image file (JPEG, PNG, SVG).";
export const company_light_logo_format_error =
  "Please upload a valid image file (JPEG, PNG, ICO).";
export const favicon_logo_format_error =
  "Please upload a valid image file (JPEG, PNG, SVG).";
export const email_logo_format_error =
  "Please upload a valid image file (JPEG, PNG, SVG).";
export const invalid_selection_error =
  "Please select a valid language from the dropdown.";
export const default_url_empty_error = "Default URL cannot be empty.";
export const custom_url_empty_error = "Custom URL cannot be empty if enabled.";
export const invalid_url_para_error =
  "Invalid URL parameters. Please use the correct format (e.g., ?utm_source=test).";
export const url_preview_error =
  "Unable to generate URL preview. Please check your input.";

export const company_dark_filesize_error =
  "File size exceeds the maximum limit of 5MB.";
export const company_light_filesize_error =
  "File size exceeds the maximum limit of 5MB.";
export const favicon_filesize_error =
  "File size exceeds the maximum limit of 1MB.";
export const email_filesize_error =
  "File size exceeds the maximum limit of 5MB.";
export const default_url_inavlid_format_error =
  "Please enter a valid URL in the format 'https://example.com'.";
export const custom_url_inavlid_format_error =
  "Please enter a valid URL in the format 'https://example.com'.";
export const url_para_char_limit_error =
  "URL Parameters cannot exceed 250 characters.";

export const company_dark_img_dimension_error =
  "Image dimensions must be at least 200x200 pixels.";
export const company_light_img_dimension_error =
  "Image dimensions must be at least 200x200 pixels.";
export const favicon_img_dimension_error =
  "Image dimensions must be exactly 16x16 or 24x24 pixels.";
export const email_img_dimension_error =
  "Image dimensions must be at least 200x200 pixels.";
export const custom_url_already_exist_error =
  "Custom URL already exists. Please choose a different one.";

// Payment Settings

export const invalid_currency_selection_error =
  "Please select a currency to proceed. Please select an option.";

export const stripe_key_empty_error =
  "Stripe Key cannot be empty. Please enter your Stripe Key..";
export const stripe_secret_empty_error =
  "Stripe Secret cannot be empty. Please enter your Stripe Secret.";
export const invalid_stripe_key_error =
  "Invalid Stripe Key. Please ensure it follows the correct format.";
export const invalid_stripe_secret_error =
  "Invalid Stripe Secret. Please ensure it follows the correct format.";
export const stripe_key_length_error =
  "Stripe Key must be 32 characters. Please check and retry.";

export const client_id_empty_error =
  "Client ID cannot be empty. Please enter your PayPal Sandbox Client ID.";
export const paypal_secret_key_empty_error =
  "Secret Key cannot be empty. Please enter your PayPal Secret Key.";
export const invalid_client_id_error =
  "Invalid Client ID. Please check and enter a valid PayPal Client ID.";
export const invalid_secret_key_error =
  "Invalid Secret Key. Please check and enter a valid PayPal Secret Key";
export const client_id_format_error =
  "Invalid Client ID format. Please enter a valid Client ID.";
export const paypal_secret_key_format_error =
  "Invalid Secret Key format. Please enter a valid Secret Key.";

export const public_key_empty_error =
  "Public Key cannot be empty. Please enter your Razorpay Public Key.";
export const razorpay_secret_key_empty_error =
  "Secret Key cannot be empty. Please enter your Razorpay Secret Key.";
export const invalid_public_key_error =
  "Invalid Public Key format. Please enter a valid Razorpay Public Key.";
export const invalid_razorpay_secret_key_error =
  "Invalid Secret Key format. Please enter a valid Razorpay Secret Key.";
export const public_key_length_error =
  "Public Key must be exactly 32 characters long.";
export const razorpay_secret_key_length_error =
  "Secret Key must be exactly 40 characters long.";

// Pusher Settings

export const pusher_api_key_empty_error =
  "Pusher API Key cannot be empty. Please provide a valid API Key.";
export const pusher_app_id_empty_error =
  "Pusher APP ID cannot be empty. Please provide a valid App ID.";
export const app_secret_empty_error =
  "Pusher App Secret cannot be empty. Please enter the App Secret.";
export const cluster_empty_error =
  "Pusher Cluster cannot be empty. Please select a valid cluster.";

export const pusher_api_key_format_error =
  "Invalid API Key format. Please enter a valid alphanumeric API Key.";
export const pusher_app_id_format_error =
  "Invalid App ID format. Please ensure the App ID is correct and in the right format.";
export const app_secret_secure_error =
  "The App Secret you entered is too weak. Please use a stronger, more secure key.";
export const invalid_cluster_error =
  "Invalid Cluster. Please ensure the cluster name is valid (e.g., 'mt1').";

export const app_secret_length_error =
  "Invalid App Secret format. The key must be at least 24 characters long.";

export const app_secret_format_error =
  "Invalid App Secret format. The key must only contain alphanumeric characters.";

export const app_secret_leading_trailing_format_error =
  "Invalid App Secret format. The key must not contain spaces or leading/trailing whitespace.";

// Recaptch Settings

export const recaptcha_selection_error =
  "Select a reCAPTCHA type. Please fill in it.";
export const google_recaptcha_key_empty_error =
  "Google reCAPTCHA Key cannot be empty. Please provide a valid key.";
export const recaptcha_version_empty_error =
  "Please select a reCAPTCHA version.";
export const recaptcha_secret_empty_error =
  "Google reCAPTCHA Secret cannot be empty. Please provide a valid secret.";

export const invalid_google_recaptcha_key_error =
  "Invalid Google reCAPTCHA Key format. Please enter a valid key.";
export const invalid_recaptcha_version_error =
  "Invalid reCAPTCHA version selected. Please select a valid version.";
export const invalid_recaptcha_secret_error =
  "Invalid Google reCAPTCHA Secret format. Please enter a valid secret.";

// Gobal Settings

export const global_business_name_empty_error =
  "Business Name cannot be empty. Please provide a valid name.";
export const global_email_addr_empty_error =
  "Email Address cannot be empty. Please enter a valid email.";
export const global_phone_empty_error =
  "Phone Number cannot be empty. Please enter a valid phone number.";
export const global_flat_unit_empty_error =
  "Flat/Unit field can be left empty. Please enter a Flat/Unit.";
export const global_street_empty_error =
  " Street cannot be empty. Please enter a valid street address.";
export const global_postcode_empty_error =
  "Postcode cannot be empty. Please enter a valid postcode.";
export const global_city_empty_error =
  "City cannot be empty. Please enter a valid city name.";

export const invalid_global_business_name_error =
  "Business Name contains invalid characters. Please use letters, numbers, and spaces only.";
export const invalid_global_email_addr_error =
  "Please enter a valid email address (e.g., name@example.com).";
export const invalid_global_phone_format_error =
  "Invalid phone number format. Please enter a valid number (e.g., 1234567890).";
export const global_postcode_format_error =
  "Invalid postcode format. Please enter a valid postcode (e.g., 12345).";

export const invalid_global_phone_length_error =
  "Phone Number must be at least 10 digits long.";

// Localization Settings

export const local_number_format_selection_error =
  "Please select a number format.";
export const local_currency_format_selection_error =
  "Please select a currency format.";
export const local_timezone_selection_error = "Please select a timezone type.";
export const local_data_fromat_selection_error = "Please select a date format.";
export const local_timezone2_selection_error =
  " Select a timezone. Please fill in it.";
export const local_week_start_selection_error =
  " Select a Week Start. Please fill in it.";

// User Access & Security Settings

export const user_select_time_empty_error =
  "Please enter a time for auto logout.";
export const user_login_attempt_error =
  "Please enter the maximum login attempts.";
export const user_lockout_empty_error = "Please select a lockout duration.";
export const user_custom_logout_limit_error =
  "Custom logout time cannot exceed 120 minutes.";
export const invalid_user_max_login_attempt_error =
  "Invalid number of login attempts. Please enter a number between 1 and 10.";

// System & OTP Setting

export const invalid_system_otp_exp_time_error =
  "Invalid OTP expiration time. Please enter a valid number of minutes.";
export const system_max_otp_attempt_error =
  "Please specify the maximum OTP attempts.";
export const system_start_date_error =
  "Please specify a start date system maintenance.";
export const system_end_date_error =
  "Please specify a end date system maintenance.";
export const system_start_time_error =
  "Please specify a start time system maintenance.";
export const system_end_time_error =
  "Please specify a end time system maintenance.";
export const system_max_otp_exceed_error =
  "Exceeded maximum OTP attempts limit. Please enter a value between 1 and 10.";

// Log Settings

export const log_retention_period_required_error =
  "Select a sent retention period type. Please fill in it.";
export const log_storage_required_error =
  "Please specify the log storage location or capacity.";
export const log_retention_period_exceed_error =
  "Retention period cannot exceed 365 days.";
export const log_storage_limit_error =
  "Log storage capacity exceeds the maximum allowed limit of 10 GB.";

// Data Backup Settings

export const data_google_folder_path_required_error =
  "Please provide a Google Drive folder path for backup.";
export const data_custom_retention_limit_error =
  "Retention period cannot exceed 365 days.";
export const data_select_time_required_error =
  "Please select a time for the backup.";
export const data_google_folder_path_length_error =
  "The folder path exceeds the maximum length. Please shorten the path.";

export const integration_email_required_error =
  "Please enter your Google Account Email ID.";
export const integration_api_key_required_error =
  "Please enter your Google API Key.";
export const invalid_integration_email_error =
  "Invalid email format. Please enter a valid Google Account Email ID.";
export const invalid_integration_api_key_error =
  "Invalid API Key format. Please enter a valid Google API Key.";
export const integration_email_format_error =
  "The provided email address 'user@example.com' does not correspond to a valid Google account.";
export const integration_api_key_permission_error =
  "This API Key is not authorized to access the specified services. Please check your key permissions.";

// Personalization Settings - ColorPaletComp

export const invalid_color_format_error =
  "Invalid color format. Please enter a valid hex code (e.g., #FFFFFF).";

// Email Blacklist Settings

export const eblacklist_login_required_error =
  "No limit set for incorrect login attempts. Please fill in it.";
export const eblacklist_pass_required_error =
  "No limit set for frequent password reset requests. Please fill in it.";
export const location_selection_error =
  "Please select an option for suspicious login locations.";

export const invalid_eblacklist_login_error =
  "Invalid input. Please enter a positive integer for login attempts.";
export const invalid_eblacklist_pass_error =
  "Value too low. The minimum allowed reset requests is 1.";

// Phone Blacklist Settings

export const pblacklist_fraudal_activity_required_error =
  "Fraudulent activity complaints limit cannot be blank. Please enter a valid number.";
export const pblacklist_failed_otp_required_error =
  "Max failed OTP verifications cannot be blank. Please enter a valid number.";
export const pblacklist_two_factauth_required_error =
  "Max failed two-factor authentication attempts cannot be blank. Please fill in it.";

export const fraudal_activity_limit_error =
  "Value too high. The maximum allowed complaints is 100.";
export const failed_otp_limit_error =
  "Value too low. The minimum allowed failed OTP attempts is 1.";
export const two_factauth_limit_error =
  "Invalid input. Please enter a positive integer for two-factor authentication attempts.";

// IP Blacklist Settings

export const iblacklist_login_empty_error =
  "Max failed login attempts cannot be empty. Please enter a valid number.";
export const iblacklist_api_misuse_empty_error =
  "Max repeated API misuse count cannot be empty. Please enter a valid number.";
export const iblacklist_incorrect_form_empty_error =
  "Max incorrect form submissions cannot be empty. Please enter a valid number.";
export const iblacklist_ddod_detection_empty_error =
  "DDoS detection settings cannot be empty. Please configure the detection threshold.";
export const iblacklist_location_selection_error =
  "Please select an option for suspicious login locations.";

export const invalid_iblacklist_login_error =
  "Invalid input. Please enter a positive integer for login attempts.";
export const invalid_iblacklist_api_misuse_error =
  "Value too low. The minimum allowed API misuse attempts is 1.";
export const invalid_iblacklist_incorrect_form_error =
  "Value too high. The maximum allowed incorrect form submissions is 50.";
export const invalid_iblacklist_ddod_detection_error =
  "Please enter a positive integer for detecting potential DDoS attacks.";

// Add Notice

export const notice_content_required_error =
  "Notice content is required. Please enter the notice details.";
export const notice_start_date_error = "This is an error message.";
export const notice_end_date_error = "This is an error message.";
export const notice_content_limit_error =
  "Notice content cannot exceed 10,000 characters. Please shorten the notice.";

// Add Badge

export const badge_name_required_error = "Badge name is required. ";
export const badge_desc_limit_error =
  "Badge description must be 300 characters or fewer.";
export const badge_type_required_error = "Please select a badge type.";
export const badge_criteria_limit_error =
  "Achievement criteria must not exceed 500 characters.";
export const badge_icon_required_error =
  "Badge icon is required. Please upload in it.";
export const badge_status_required_error = "Please select a badge status.";

export const badge_name_limit_error =
  "Badge name must not exceed 50 characters.";
export const badge_icon_upload_error = "Please upload a badge icon.";
export const badge_status_inactive_error =
  "Cannot mark as inactive because it is in use.";

export const badge_name_already_exist_error =
  "A badge with this name already exists.";
export const badge_icon_format_error =
  "Unsupported file format. Please upload a PNG, JPG, JPEG, or SVG file.";

export const badge_icon_upload_failed_error =
  "Failed to upload badge icon. Please try again.";

export const badge_icon_upload_connection_error =
  "Image upload failed. Please check your connection.";

// Add Segment

export const segment_name_required_error = "Segment name is required.";
export const segment_conditions_required_error =
  "Please select at least one condition.";
export const segment_name_char_error =
  "Segment name must contain at least one character.";
export const segment_name_already_exist_error =
  "A segment with this name already exists. Please use a different name.";

// Add FAQ

export const unique_faq_id_error =
  "Unable to assign a unique FAQ ID. Please contact support.";
export const faq_catagory_required_error = "Please select a valid category.";
export const faq_question_required_error = "Question field cannot be empty.";
export const faq_answer_required_error = "Answer field cannot be empty.";
export const faq_keywords_required_error = "Keyword field cannot be empty.";
export const faq_visibility_required_error =
  "Please select the visibility level for this FAQ.";
export const faq_tags_required_error = "Please add at least one tag.";
export const faq_priority_required_error = "Please select a priority level.";

export const faq_question_limit_error =
  "Question exceeds the maximum length of 200 characters.";
export const faq_answer_limit_error =
  "Answer exceeds the maximum length of 500 characters.";

export const faq_keywords_comma_error =
  "Keywords should be separated by commas.";

export const faq_keywords_limit_error = "You can add up to 10 keywords only.";
export const faq_tags_limit_error = "You can add up to 5 tags only.";

// Add Document

export const document_module_required_error = "Please select a module.";
export const document_title_required_error = "Title is required. ";
export const document_content_required_error = "Content is required field. ";

export const document_module_loading_failed_error =
  "Failed to load module list. Please refresh or try again.";
export const document_title_limit_error =
  "Title cannot exceed 100 characters. Please shorten the description.";
export const document_content_limit_error =
  "Content cannot exceed 10,000 characters. Please shorten the content.";

export const document_title_already_exist_error =
  "A document with this title already exists. Please choose a different title.";
