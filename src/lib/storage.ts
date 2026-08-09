import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Hetzner Object Storage is S3-compatible, so the AWS SDK works
// against it directly with a custom endpoint. See docs/SALES_SETUP.md.

function getClient() {
  const endpoint = process.env.HETZNER_S3_ENDPOINT;
  const accessKeyId = process.env.HETZNER_S3_ACCESS_KEY;
  const secretAccessKey = process.env.HETZNER_S3_SECRET_KEY;
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "HETZNER_S3_ENDPOINT / HETZNER_S3_ACCESS_KEY / HETZNER_S3_SECRET_KEY are not set. See docs/SALES_SETUP.md.",
    );
  }
  return new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });
}

// Signed URL expires in 7 days per the Sales Process Spec (section 2) —
// download-attempt limiting is enforced separately, at the app level,
// since S3-compatible presigned URLs don't support a use-count cap.
export async function createDownloadUrl(objectKey: string) {
  const bucket = process.env.HETZNER_S3_BUCKET;
  if (!bucket) {
    throw new Error("HETZNER_S3_BUCKET is not set. See docs/SALES_SETUP.md.");
  }
  const client = getClient();
  const command = new GetObjectCommand({ Bucket: bucket, Key: objectKey });
  return getSignedUrl(client, command, { expiresIn: 60 * 60 * 24 * 7 });
}
