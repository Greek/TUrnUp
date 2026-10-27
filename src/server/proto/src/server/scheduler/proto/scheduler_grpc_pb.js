// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var src_server_scheduler_proto_scheduler_pb = require('../../../../src/server/scheduler/proto/scheduler_pb.js');

function serialize_GetSnapshotRequest(arg) {
  if (!(arg instanceof src_server_scheduler_proto_scheduler_pb.GetSnapshotRequest)) {
    throw new Error('Expected argument of type GetSnapshotRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetSnapshotRequest(buffer_arg) {
  return src_server_scheduler_proto_scheduler_pb.GetSnapshotRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetSnapshotResponse(arg) {
  if (!(arg instanceof src_server_scheduler_proto_scheduler_pb.GetSnapshotResponse)) {
    throw new Error('Expected argument of type GetSnapshotResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetSnapshotResponse(buffer_arg) {
  return src_server_scheduler_proto_scheduler_pb.GetSnapshotResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SchedulerServiceService = exports.SchedulerServiceService = {
  getSnapshot: {
    path: '/SchedulerService/GetSnapshot',
    requestStream: false,
    responseStream: false,
    requestType: src_server_scheduler_proto_scheduler_pb.GetSnapshotRequest,
    responseType: src_server_scheduler_proto_scheduler_pb.GetSnapshotResponse,
    requestSerialize: serialize_GetSnapshotRequest,
    requestDeserialize: deserialize_GetSnapshotRequest,
    responseSerialize: serialize_GetSnapshotResponse,
    responseDeserialize: deserialize_GetSnapshotResponse,
  },
};

exports.SchedulerServiceClient = grpc.makeGenericClientConstructor(SchedulerServiceService, 'SchedulerService');
