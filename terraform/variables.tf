variable "aws_region" {
  description = "The AWS region to deploy resources"
  default     = "us-east-1"
}

variable "db_username" {
  description = "The username for the database"
  default     = "admin"
}

variable "db_password" {
  description = "The password for the database"
  default     = "password123"
}

variable "db_name" {
  description = "The name of the database"
  default     = "camping_app_db"
}

variable "s3_bucket_name" {
  description = "The name of the S3 bucket for file storage"
  default     = "camping-app-files"
}

variable "instance_type" {
  description = "The type of EC2 instance to use"
  default     = "t2.micro"
}