aws ec2 modify-vpc-attribute \
--vpc-id $VPC_ID \
--enable-dns-hostnames "{\"Value\":true}"