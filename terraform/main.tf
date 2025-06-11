resource "aws_s3_bucket" "camping_app_bucket" {
  bucket = "camping-app-bucket"
  acl    = "private"
}

resource "aws_dynamodb_table" "items_table" {
  name         = "Items"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "group_id"
    type = "S"
  }
  key_schema {
    attribute_name = "id"
    key_type       = "HASH"
  }
}

resource "aws_dynamodb_table" "users_table" {
  name         = "Users"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "id"
    type = "S"
  }
  key_schema {
    attribute_name = "id"
    key_type       = "HASH"
  }
}

resource "aws_dynamodb_table" "groups_table" {
  name         = "Groups"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "id"
    type = "S"
  }
  key_schema {
    attribute_name = "id"
    key_type       = "HASH"
  }
}

output "s3_bucket_name" {
  value = aws_s3_bucket.camping_app_bucket.bucket
}

output "items_table_name" {
  value = aws_dynamodb_table.items_table.name
}

output "users_table_name" {
  value = aws_dynamodb_table.users_table.name
}

output "groups_table_name" {
  value = aws_dynamodb_table.groups_table.name
}