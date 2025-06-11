output.tf

output "api_gateway_url" {
  value = aws_api_gateway_deployment.example.invoke_url
}

output "db_endpoint" {
  value = aws_db_instance.example.endpoint
}

output "s3_bucket_name" {
  value = aws_s3_bucket.example.bucket
}