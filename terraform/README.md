# Terraform README

# Terraform Setup for Camping App

This README provides instructions for setting up the infrastructure for the Camping App using Terraform on AWS.

## Prerequisites

- Ensure you have [Terraform](https://www.terraform.io/downloads.html) installed on your machine.
- Configure your AWS credentials. You can do this by setting up the AWS CLI or by exporting your credentials as environment variables.

## Directory Structure

The Terraform configuration files are located in the `terraform` directory:

- `main.tf`: Contains the main configuration for AWS resources.
- `variables.tf`: Defines the variables used in the Terraform configuration.
- `outputs.tf`: Specifies the outputs from the Terraform configuration.

## Commands to Set Up Infrastructure

1. Navigate to the terraform directory:
   ```
   cd terraform
   ```

2. Initialize the Terraform configuration:
   ```
   terraform init
   ```

3. Apply the Terraform configuration to create the infrastructure on AWS:
   ```
   terraform apply
   ```

   Review the changes that will be made and type `yes` to confirm.

## Additional Information

- Make sure to review the `variables.tf` file to customize any variables according to your needs.
- After running `terraform apply`, you can check the AWS Management Console to see the resources created.

## Cleanup

To remove the infrastructure created by Terraform, run:
```
terraform destroy
```
Type `yes` to confirm the destruction of resources.